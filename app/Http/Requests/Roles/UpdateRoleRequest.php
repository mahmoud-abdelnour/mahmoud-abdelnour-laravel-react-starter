<?php

namespace App\Http\Requests\Roles;

use App\Http\Requests\BaseRequest;
use App\Models\Role;

class UpdateRoleRequest extends BaseRequest{
    
    public function authorize(): bool{
        return true;
    }

    public function rules(): array {
        $rules = Role::$rules;
        $rules['name'] = 'required|unique:roles,name,'.$this->route('role');
        return $rules;
    }

  
    public function messages(): array {
        return [
            'permissions.required' => 'Please select any permission',
        ];
    }
}
