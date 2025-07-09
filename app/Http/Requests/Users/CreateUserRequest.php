<?php

namespace App\Http\Requests\Users;

use App\Models\User;
use App\Http\Requests\BaseRequest;

class CreateUserRequest extends BaseRequest{
    
    public function authorize(): bool{
        return true;
    }

    public function rules(): array{
        return User::$rules;
    }
}
