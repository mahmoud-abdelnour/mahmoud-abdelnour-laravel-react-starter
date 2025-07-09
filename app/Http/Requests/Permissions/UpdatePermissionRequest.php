<?php

namespace App\Http\Requests\Roles;

use App\Http\Requests\BaseRequest;
use App\Models\Permission;

class UpdatePermissionRequest extends BaseRequest{
    
    public function authorize(): bool{
        return true;
    }

    public function rules(): array {
        $rules = Permission::$rules;
        $rules['name'] = 'required|unique:roles,name,'.$this->route('permission');
        return $rules;
    }

  
    public function messages(): array {
        return [
            'permissions.required' => 'Please select any permission',
        ];
    }
}
