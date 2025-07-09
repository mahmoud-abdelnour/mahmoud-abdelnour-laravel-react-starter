<?php

namespace App\Http\Controllers\API;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Services\SettingsService;
use App\Responses\ApiResponse;
use Illuminate\Http\JsonResponse;
use App\Repositories\RoleRepository;
use App\Http\Resources\RoleCollection;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Roles\CreateRoleRequest;
use App\Http\Requests\Roles\UpdateRoleRequest;


class SettingsAPIController extends AppBaseController {
  
    private $roleRepository;

    public function __construct(private SettingsService  $settingsService,private  ApiResponse $apiResponse) {

    }

    public function index(Request $request) : JsonResponse {
        $response = $this->settingsService->getSettings($request);
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }

    public function update(Request $request) : JsonResponse {
        $response = $this->settingsService->updateSettings($request);
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }
    
}
