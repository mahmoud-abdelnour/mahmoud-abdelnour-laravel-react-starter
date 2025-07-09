<?php 
namespace App\Services; 


use DB;
use Auth;
use Exception;
use App\Models\User;
use App\Traits\ReturnData;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/* 
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Validation\ValidationException;
use Illuminate\Contracts\Auth\Factory as AuthFactory;
 */
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class AuthService {

    use ReturnData;

    function __construct(private UserRepository $userRepository) {
       
    }   

    public function login($credentials) {
        try {
            if ($check = Auth::attempt($credentials)) {
                $user = Auth::user();

                $tokenResult = $user->createToken('Personal Access Token');
                $token = $tokenResult->token;
                $token->expires_at = Carbon::now()->addWeeks(4);
                $token->save();
                
                $userPermissions = $user->getAllPermissions()->pluck('name')->toArray();
                

                $user = new UserResource($user);
              
                return $this->createReturnData(
                    [],
                    Response::HTTP_OK,
                    [
                        'user' => $user,
                        'permissions' => $userPermissions,
                        'access_token' => $tokenResult->accessToken,
                        'token_type' => 'Bearer',
                        'expires_at' => Carbon::parse(
                            $tokenResult->token->expires_at
                        )->toDateTimeString()
                    ],
                    [trans('auth.login_success')]
                );
            }else{
                return $this->createReturnData(
                    [trans('auth.invalid_auth_credentials')],
                    Response::HTTP_UNAUTHORIZED,
                    []
                );
            }
        } catch (Exception $exception) {
            logger([
                'error' => $exception->getMessage(),
                'code' => $exception->getCode(),
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
            ]);
            return $this->createReturnData([trans('auth.login_failed')], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

    }


    public function register($data) {

        try {
            DB::beginTransaction();
            $name = $data['name'];
            $email = $data['email'];
            $password = $data['password'];
            $phone = $data['phone'];
            $roles = $data['roles'];
            $user = $this->userRepository->create([
                'name'=>$name,
                'email'=>$email,
                'phone'=>$phone,
                'password' => Hash::make($password),
            ]);

            if(!empty($roles)){
                $user->assignRole($roles);
            }else{
                $user->assignRole('admin');
            }

            if ($user) {
                $tokenResult = $user->createToken('Personal Access Token');
                $token = $tokenResult->token;
                $token->expires_at = Carbon::now()->addWeeks(4);
                $token->save();
                

                $user = new UserResource($user);
                $data = [
                    'user' => $user,
                    'access_token' => $token
                ];


                DB::commit();
                return $this->createReturnData(
                    [],
                    Response::HTTP_OK,
                    $data,
                    [trans('common.user_created_success')]
                );
            }
            
            return $this->createReturnData(
                [],
                Response::HTTP_UNPROCESSABLE_ENTITY,
                [],
                [trans('common.user_create_fail')]
            );
        } catch (\Throwable $e) {
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


    function logout(){
        try {
            $user = Auth::user();
            if ($user ) {
                $token = $user->token();
                $token->revoke();

                return $this->createReturnData(
                    [],
                    Response::HTTP_OK,
                    [],
                    [trans('auth.logout_success')]
                );
            }else{
                return $this->createReturnData(
                    [trans('auth.logout_failed')],
                    Response::HTTP_UNAUTHORIZED,
                    []
                );
            }

        } catch (Exception $exception) {
            logger([
                'error' => $exception->getMessage(),
                'code' => $exception->getCode(),
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
            ]);
            return $this->createReturnData([trans('auth.logout_failed')], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

}