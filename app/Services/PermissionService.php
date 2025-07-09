<?php 
namespace App\Services; 


use DB;
use Auth;
use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Traits\ReturnData;
use Illuminate\Support\Str;
use App\Http\Resources\PermissionResource;
use App\Http\Resources\PermissionCollection;
use App\Repositories\PermissionRepository;
use Illuminate\Http\Response;


class PermissionService {

    use ReturnData;

    function __construct(private PermissionRepository $permissionRepository) {
       
    }   

    function getPermissions($request, $allPermissions = false): array {
        
        try{  
            $perPage = getPageSize($request);
            if($allPermissions){
                $permissions = $this->permissionRepository->all();
            }else{
                $permissions = $this->permissionRepository->paginate($perPage);
            }
        
            $permissions = new PermissionCollection($permissions);
            $permissions  = $permissions->response()->getData(); 
          
            return $this->createReturnData(
                [],
                Response::HTTP_OK,
                $permissions,
                [trans('common.get_permissions')]
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

    public function storePermission($data) {
        try {
            DB::beginTransaction();
            $permission = $this->permissionRepository->create([
                'name' => $data['name'],
                'guard_name' => 'web' 
            ]);
            
            if ($permission) {
                $permission = new PermissionResource($permission);
                DB::commit();
                return $this->createReturnData(
                    [],
                    Response::HTTP_OK,
                    $permission,
                    [trans('common.permission_created_success')]
                );
            }
            return $this->returnData->create(
                [],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                [],
                [trans('common.permission_create_fail')]
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

    function updatePermission($request,$id){
        try {
            DB::beginTransaction();
            $permission = $this->permissionRepository->find($id);
           
            if ($permission){
                $permission->update([
                    'name' => $request->name
                ]);
               
                $permission = new PermissionResource($permission);
    
                DB::commit();
                return $this->createReturnData(
                    [],
                    Response::HTTP_OK,
                    $permission,
                    [trans('common.permission_update_success')]
                );
            }
            return $this->createReturnData(
                [],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                [],
                [trans('common.permission_update_fail')]
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
                [trans('common.permission_update_fail')],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                [],
                []
            );
        }
    }

    function deletePermission($id){
        try {
            DB::beginTransaction();
            $permission = $this->permissionRepository->delete($id);
            if($permission){
                DB::commit();
                return $this->createReturnData(
                    [],
                    Response::HTTP_OK,
                    [],
                    [trans('common.permission_succes')]
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
                [trans('common.permission_fail')],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                []
            );
        }
    }

    function showPermission($id){
        try{  
            $role = $this->roleRepository->with(['permissions'])->find($id);
            $role = new RoleResource($role);
            return $this->createReturnData(
                [],
                Response::HTTP_OK,
                $role,
                [trans('common.show_permission')]
            );
        }catch(Exception $e){
            logger()->error('Can not get permission ', [
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