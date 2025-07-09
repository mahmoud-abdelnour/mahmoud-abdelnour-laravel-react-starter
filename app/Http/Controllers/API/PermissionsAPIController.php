<?php

namespace App\Http\Controllers\API;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Services\PermissionService;
use App\Responses\ApiResponse;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\RoleResource;
use App\Repositories\RoleRepository;
use App\Http\Resources\RoleCollection;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Roles\CreateRoleRequest;
use App\Http\Requests\Roles\UpdateRoleRequest;

class PermissionsAPIController extends AppBaseController {
  
    private $roleRepository;

    public function __construct(private PermissionService  $permissionService,private  ApiResponse $apiResponse) {

    }

    public function index(Request $request): JsonResponse{
        $response = $this->permissionService->getPermissions($request);
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }

    public function store(CreateRoleRequest $request): JsonResponse {
        $response = $this->permissionService->storePermission($request->validated());
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }

    public function show($id): JsonResponse {
        $response = $this->permissionService->showPermission($id);
        return $this->apiResponse
            ->setData($response['data'] ?? [])
            ->setMessages($response['messages'] ?? [])
            ->setErrors($response['errors'] ?? [])
            ->setCode($response['code'])
            ->create();
    }

    public function update(UpdateRoleRequest $request,$id) : JsonResponse {
        $response = $this->permissionService->updatePermission($request,$id);
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }

    public function destroy($id): JsonResponse {
        $response = $this->permissionService->deletePermission($id);
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }


}
