<?php 
namespace App\Services; 


use DB;
use Auth;
use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Traits\ReturnData;
use Illuminate\Support\Str;
use Illuminate\Http\Response;
use App\Http\Resources\RoleResource;
use App\Repositories\RoleRepository;
use App\Http\Resources\RoleCollection;


class RoleService {

    use ReturnData;

    function __construct(private RoleRepository $roleRepository) {
       
    }   

    function getRoles($request,$allRoles = false): array {
        
        try{  
            $perPage = getPageSize($request);
            if($allRoles){
                $roles = $this->roleRepository->all();
            }else{
                $roles = $this->roleRepository->paginate($perPage);
            }

            if ($request->get('name')) {
                //$roles->where('name', $request->get('name'));
            }
        
            $roles = new RoleCollection($roles);
            $roles  =$roles->response()->getData(); 
          
            return $this->createReturnData(
                [],
                Response::HTTP_OK,
                $roles,
                [trans('common.get_roles')]
            );

        }catch(Exception $e){
            logger()->error('Can not get roles ', [
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

    public function storeRole($data) {
        try {
            DB::beginTransaction();
            $role = $this->roleRepository->create([
                'name' => $data->name,
                'display_name' => $data->display_name,
                'guard_name' => 'web' 
            ]);
            
            if ($role) {
                if (!empty($data->permissions)) {
                    $permissions = collect($data->permissions)->map(fn($val) => (int)$val)->all();
                    $role->givePermissionTo($permissions);
                }

                $role = new RoleResource($role);
                DB::commit();
                return $this->createReturnData(
                    [],
                    Response::HTTP_OK,
                    $role,
                    [trans('common.role_created_success')]
                );
            }
            return $this->returnData->create(
                [],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                [],
                [trans('common.role_create_fail')]
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
                [$e->getMessage()],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                [],
                []
            );
        }
    }

    function updateRole($request,$id){
        try {
            DB::beginTransaction();
            $role = $this->roleRepository->find($id);
            if ($role){
                $permissions = $request->permissions;

                $role->update([
                    'name' => $request->name,
                    'display_name' => $request->display_name
                ]);

                if(!empty($permissions)){
                    $permissions = collect($permissions)->map(fn($val) => (int)$val)->all();
                    $role->syncPermissions($permissions);
                }
                $role = new RoleResource($role);
    
                DB::commit();
                return $this->createReturnData(
                    [],
                    Response::HTTP_OK,
                    $role,
                    [trans('common.role_update_success')]
                );
            }
            return $this->createReturnData(
                [],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                [],
                [trans('common.role_update_fail')]
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
                [trans('common.role_update_fail')],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                [],
                []
            );
        }
    }

    function deleteRole($id){
        try {
            DB::beginTransaction();
            $role = $this->roleRepository->delete($id);
            if($role){
                DB::commit();
                return $this->createReturnData(
                    [],
                    Response::HTTP_OK,
                    [],
                    [trans('common.role_task_succes')]
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
                [trans('common.role_delete_fail')],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                []
            );
        }
    }

    function showRole($id){
        try{  
            $role = $this->roleRepository->with(['permissions'])->find($id);
            $role = new RoleResource($role);
            return $this->createReturnData(
                [],
                Response::HTTP_OK,
                $role,
                [trans('common.show_role')]
            );
        }catch(Exception $e){
            logger()->error('Can not get role ', [
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

}