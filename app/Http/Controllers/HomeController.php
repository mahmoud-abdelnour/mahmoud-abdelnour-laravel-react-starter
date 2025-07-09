<?php

namespace App\Http\Controllers;

//use DB;

use App\Models\User;
use Illuminate\Http\Request;
use App\Responses\ApiResponse;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserResource;
use App\Repositories\RoleRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Spatie\QueryBuilder\QueryBuilder;

use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;

class HomeController extends Controller
{
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(private UserRepository $userRepository,private ApiResponse $apiResponse,
        private RoleRepository $roleRepository
    ){
        $this->middleware('auth', ['except' => ['test']]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }


    function test() {
        
      /*   $id = 4;
        $role = $this->roleRepository->with(['permissions'])->find($id);
        dump($role);

        $roles = $this->roleRepository->paginate();
        dump($roles); */



        /* 

        $model = User::wherenotNull('email');
        $model = User::class;
        $model = User::find(1); // this make exception
        //$model = get_class($model);;
        dump($model);

        //Illuminate\Database\Eloquent\Builder
        //"App\Models\User" 
        //EloquentBuilder|Relation|string $subject,
        
        if ($model instanceof Model) {
            echo("Model");
        }
        if ($model instanceof Relation) {
            echo("Relation");
        }
        if ($model instanceof EloquentBuilder) {
            echo("EloquentBuilder");
        }
        if (is_string($model)) {
            echo("Srting");
        }


        $users = QueryBuilder::for($model)
        ->allowedFilters(['name', 'email'])
        ->get(); */

        //dump($users);
        die;
   



        try{
         
            $user = User::find(25);
            $response['data'] = $user;
            $response['messages'] = [''];
            $response['errors'] = [''];
            $response['code'] = 200;
            return $this->apiResponse
            ->setData($response['data'])
            ->setMessages($response['messages'])
            ->setErrors($response['errors'])
            ->setCode($response['code'])
            ->create();

        }catch(\Exception $e){
        //} catch (\Throwable $e) {

            //dd($e->getMessage());
             //$ecdd =  $this->apiResponse->setCode(500)->setErrors([$e->getMessage()])->create();
          ;
        } 
        return  $ecdd;
        //return new UserResource($user);

    }   
}
