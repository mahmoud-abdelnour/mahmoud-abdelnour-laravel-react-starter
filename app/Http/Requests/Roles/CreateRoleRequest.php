<?php

namespace App\Http\Requests\Roles;

use App\Http\Requests\BaseRequest;
use App\Models\Role;

class CreateRoleRequest extends BaseRequest{
    
    public function authorize(): bool{
        return true;
    }

    public function rules(): array{
        return Role::$rules;
    }
}
