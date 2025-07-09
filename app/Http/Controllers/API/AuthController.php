<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Services\AuthService;



use App\Responses\ApiResponse;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use App\Http\Controllers\AppBaseController;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Auth\Factory as AuthFactory;

class AuthController extends Controller {
   
  

    public function __construct(private AuthService  $authService,private  ApiResponse $apiResponse) {
     
       
    }

    public function login(LoginRequest $loginRequest): JsonResponse {
        $response = $this->authService->login($loginRequest->only('email', 'password'));
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
        
    }

    public function register(RegisterRequest $registerRequest): JsonResponse {
        $response = $this->authService->register($registerRequest->validated());
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
    }


    public function logout(): JsonResponse {
        $response = $this->authService->logout();
        return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();
        return $this->sendSuccess('Logout Successfully');
    }

    
    public function sendPasswordResetLinkEmail(Request $request): JsonResponse {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );
        $user = User::whereEmail($request->email)->first();
        if (! $user) {
            return $this->sendError('We can\'t find a user with that e-mail address.');
        }

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => __($status)], 200);
        } else {
            throw ValidationException::withMessages([
                'email' => 'Please Wait Before Trying',
            ]);
        }
    }

    public function resetPassword(Request $request): JsonResponse {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return response()->json(['message' => __($status)], 200);
        } else {
            throw ValidationException::withMessages([
                'email' => __($status),
            ]);
        }
    }

    public function isValidToken(Request $request): JsonResponse {
        if ($token = $request->bearerToken()) {
            $model = Sanctum::$personalAccessTokenModel;

            $accessToken = $model::findToken($token);
            $valid = $this->isValidAccessToken($accessToken);

            return response()->json(['success' => __($valid)], 200);
        }

        return response()->json(['success' => false], 200);
    }

  
    protected function isValidAccessToken($accessToken): bool {
        if (! $accessToken) {
            return false;
        }

        $isValid =
            (! $this->expiration || $accessToken->created_at->gt(now()->subMinutes($this->expiration)))
            && $this->hasValidProvider($accessToken->tokenable);

        if (is_callable(Sanctum::$accessTokenAuthenticationCallback)) {
            $isValid = (bool) (Sanctum::$accessTokenAuthenticationCallback)($accessToken, $isValid);
        }

        return $isValid;
    }

    
    protected function hasValidProvider(Model $tokenable): bool {
        if (is_null($this->provider)) {
            return true;
        }

        $model = config("auth.providers.{$this->provider}.model");

        return $tokenable instanceof $model;
    }
}
