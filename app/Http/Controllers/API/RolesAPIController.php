<?php

namespace App\Http\Controllers\API;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Services\RoleService;
use App\Responses\ApiResponse;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\RoleResource;
use App\Repositories\RoleRepository;
use App\Http\Resources\RoleCollection;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Roles\CreateRoleRequest;
use App\Http\Requests\Roles\UpdateRoleRequest;

class RolesAPIController extends AppBaseController {
  
    private $roleRepository;

    public function __construct(private RoleService  $roleService,private  ApiResponse $apiResponse) {

    }


    public function index(Request $request): JsonResponse{
        $response = $this->roleService->getRoles($request);
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }

    public function store(CreateRoleRequest $request): JsonResponse {
        $response = $this->roleService->storeRole($request);
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }

    public function show($id): JsonResponse {
        $response = $this->roleService->showRole($id);
        return $this->apiResponse
            ->setData($response['data'] ?? [])
            ->setMessages($response['messages'] ?? [])
            ->setErrors($response['errors'] ?? [])
            ->setCode($response['code'])
            ->create();
    }

    public function update(UpdateRoleRequest $request,$id) : JsonResponse {
        $response = $this->roleService->updateRole($request,$id);
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }

    public function destroy($id): JsonResponse {
        $response = $this->roleService->deleteRole($id);
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
       
    }

    public function allRoles(Request $request): JsonResponse{
        $response = $this->roleService->getRoles($request,true);
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }
    

}
