<?php

namespace App\Services;


use DB;
use Auth;

use Config;
use Helper;

use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Traits\ReturnData;
use Illuminate\Http\Response;
use App\Http\Resources\UserResource;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;

use App\Http\Resources\UserCollection;
use function Laravel\Prompts\password;

class UserService{
    use ReturnData;
    public function __construct(
        private UserRepository $userRepository,
    ){
       

    }


    function getUsers($request): array {
        try{ 
            $perPage = getPageSize($request);
            $users = $this->userRepository->with(['roles','permissions'])->paginate($perPage);
            $queries = DB::getQueryLog();
            $users = new UserCollection($users);
            $users  =$users->response()->getData(); 
            return $this->createReturnData(
                [],
                Response::HTTP_OK,
                $users,
                [trans('common.users_list')]
            );
        }catch(Exception $e){
            logger()->error('Can not get users list', [
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
            ]);

            return $this->createReturnData(
                [trans('common.something_went_wrong')],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                []
            );
        }  
    }


    function storeUser($request): array {
        try {
            DB::beginTransaction();
            $name = $request->name;
            $email = $request->email;
            $password = $request->password;
            $phone = $request->phone;
            $national_id = $request->national_id;
            $roles = $request->role_id;
            $permissions = $request->permissions;
            $user = $this->userRepository->create([
                'name'=>$name,
                'email'=>$email,
                'phone'=>$phone,
                'password' => Hash::make($password),
            ]);

            $roles = collect($roles)->map(fn($val) => (int)$val)->all();

            
            if(!empty($roles)){
                $user->assignRole($roles);
            }

            if(!empty($permissions)){
                $user->givePermissionTo($permissions);
            }

            if(!empty($request->image)){
                $user->clearMediaCollection(User::PATH);
                $user->addMedia($request->image)->toMediaCollection(User::PATH, config('app.media_disc'));
            }



            $user = new UserResource($user);

            if ($user) {
                DB::commit();
                return $this->createReturnData(
                    [],
                    Response::HTTP_OK,
                    $user,
                    [trans('common.user_created_success')]
                );
            }
            return $this->createReturnData(
                [],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                [],
                [trans('common.user_create_fail')]
            );
        } catch (Exception $e) {
            DB::rollBack();
            logger(
                [
                    'error' => $e->getMessage(),
                    'code' => $e->getCode(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                ]
            );
            return $this->createReturnData(
                [trans('common.user_create_fail')],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                [],
                []
            );
        }
    }

    function updateUser($request,$id){
        try {
            DB::beginTransaction();
            $user = $this->userRepository->find($id);
            if($user){
                $name = $request->name;
                $email = $request->email;
                $password = $request->password;
                $phone = $request->phone;
                //$permissions = $request->permissions;
                $roles = $request->role_id;
                if(!empty($request->image)){
                    $user->clearMediaCollection(User::PATH);
                    $user->addMedia($request->image)->toMediaCollection(User::PATH, config('app.media_disc'));
                }


                $data = [
                    'name'=>$name,
                    'email'=>$email,
                    'phone'=>$phone,
                ];

                if(!empty($password)){
                    $data['password'] = Hash::make($password);
                }
                $user->update($data);
               

                $roles = collect($roles)
                ->map(fn($val) => (int)$val)
                ->all();


                $user->syncRoles($roles);
                
                //$user->syncPermissions($permissions);

                $user = new UserResource($user);

                DB::commit();
                return $this->createReturnData(
                    [],
                    Response::HTTP_OK,
                    $user,
                    [trans('common.user_update_success')]
                );
            }
            return $this->createReturnData(
                [],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                [],
                [trans('common.user_update_fail')]
            );
        } catch (Exception $e) {
            DB::rollBack();
            logger(
                [
                    'error' => $e->getMessage(),
                    'code' => $e->getCode(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                ]
            );
            return $this->createReturnData(
                [trans('common.user_update_fail')],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                [],
                []
            );
        }
    }
    
    function deleteUser($id){
        try {
            DB::beginTransaction();
            $user = $this->userRepository->delete($id);
            if($user){
                DB::commit();
                return $this->createReturnData(
                    [],
                    Response::HTTP_OK,
                    [],
                    [trans('common.user_delete_success')]
                );
            }
            return $this->createReturnData(
                [trans('common.not_found')],
                Response::HTTP_NOT_FOUND,
                []
            );
        }catch (Exception $excption) {
            DB::rollBack();
            logger(
                [
                    'error' => $excption->getMessage(),
                    'code' => $excption->getCode(),
                    'file' => $excption->getFile(),
                    'line' => $excption->getLine(),
                ]
            );
            return $this->createReturnData(
                [trans('common.user_delete_fail')],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                []
            );
        }
    }
    

    function showUser($id){
        try{  
            $user = $this->userRepository->find($id);
            $user = new UserResource($user);
            return $this->createReturnData(
                [],
                Response::HTTP_OK,
                $user,
                [trans('common.show_user')]
            );
        }catch(Exception $e){
            logger()->error('Can not get user ', [
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
            ]);
            return $this->createReturnData(
                [trans('common.something_went_wrong')],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                []
            );
        }    
    }


    function userPermissions($id){
        try{  
            $user = $this->userRepository->find($id);
            $permissions = $user->getAllPermissions()->pluck('name')->all();
            return $this->createReturnData(
                [],
                Response::HTTP_OK,
                $permissions,
                [trans('common.user_permissions')]
            );
        }catch(Exception $e){
            logger()->error('Can not get user_permissions ', [
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
            ]);
            return $this->createReturnData(
                [trans('common.something_went_wrong')],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                []
            );
        }   
    }

    
    function config(){
        try{  
            $id = Auth::user()->id;
            $permissions = [];
            if($id){
                $permissions = $this->userPermissions($id)['data'];
            }
            $data['permissions'] = $permissions;
        
            $user = $this->userRepository->with(['roles'])->find($id);
            $user = new UserResource($user);
            $data['user_data'] = $user;

            return $this->createReturnData(
                [],
                Response::HTTP_OK,
                $data,
                [trans('common.config')]
            );
        }catch(Exception $e){
            logger()->error('Can not get config ', [
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
            ]);
            return $this->createReturnData(
                [trans('common.something_went_wrong')],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                []
            );
        }   
    }

    function editProfile(){
        try{  
            $user = Auth::user();
            $user = new UserResource($user);
            return $this->createReturnData(
                [],
                Response::HTTP_OK,
                $user,
                [trans('common.user_')]
            );
        }catch(Exception $e){
            logger()->error('Can not get profile data ', [
                'code' => $e->getCode(),
                'message' => $e->getMessage(),
            ]);
            return $this->createReturnData(
                [trans('common.something_went_wrong')],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                []
            );
        }   
    }

    function updateUserProfile($request){
        try {
            DB::beginTransaction();
            $id = Auth::user()->id;
            $user = $this->userRepository->find($id);
            if($user){
                $name = $request->name;
                $email = $request->email;
                $password = $request->password;
                $phone = $request->phone;
                if(!empty($request->image)){
                    $user->clearMediaCollection(User::PATH);
                    $user->addMedia($request->image)->toMediaCollection(User::PATH, config('app.media_disc'));
                }

                $data = [
                    'name'=>$name,
                    'email'=>$email,
                    'phone'=>$phone,
                ];

                if(!empty($password)){
                    $data['password'] = Hash::make($password);
                }

                $user->update($data);
                $user = new UserResource($user);

                DB::commit();
                return $this->createReturnData(
                    [],
                    Response::HTTP_OK,
                    $user,
                    [trans('common.user_update_success')]
                );
            }
            return $this->createReturnData(
                [],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                [],
                [trans('common.user_update_fail')]
            );
        } catch (Exception $e) {
            DB::rollBack();
            logger(
                [
                    'error' => $e->getMessage(),
                    'code' => $e->getCode(),
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                ]
            );
            return $this->createReturnData(
                [trans('common.user_update_fail')],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                [],
                []
            );
        }



    }

}