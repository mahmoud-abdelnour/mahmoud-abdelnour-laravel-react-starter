<?php

namespace App\Http\Controllers\API;

use Exception;
use App\Models\User;
use App\Models\POSRegister;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Responses\ApiResponse;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\UserResource;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserCollection;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Users\CreateUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use App\Http\Requests\Users\UpdateUserProfileRequest;


class UserAPIController extends AppBaseController {
  

    public function __construct(private UserService $userService,private  ApiResponse $apiResponse,  private UserRepository $userRepository,) {
    
    }

    public function index(Request $request) {
       $response = $this->userService->getUsers($request);
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }

    public function store(CreateUserRequest $request): JsonResponse {
        $response = $this->userService->storeUser($request);
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }

    public function show($id): JsonResponse {
        $response = $this->userService->showUser($id);
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }

    public function update(UpdateUserRequest $request,$id) : JsonResponse {
        $response = $this->userService->updateUser($request,$id);
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }

    public function destroy($id): JsonResponse {
        $response = $this->userService->deleteUser($id);
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }

    public function editProfile(): JsonResponse {
        $response = $this->userService->editProfile();
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }

    public function updateProfile(UpdateUserProfileRequest $request): JsonResponse {
        $response = $this->userService->updateUserProfile($request);
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }

 

    public function updateLanguage(Request $request): JsonResponse {
        $language = $request->get('language');
        $user = Auth::user();
        $user->update([
            'language' => $language,
        ]);
        return $this->sendResponse($user->language, 'Language Updated Successfully');
    }

    public function config(Request $request) {
        $response = $this->userService->config();
        return $this->apiResponse
        ->setData($response['data'])
        ->setMessages($response['messages'])
        ->setErrors($response['errors'])
        ->setCode($response['code'])
        ->create();
    }

}
