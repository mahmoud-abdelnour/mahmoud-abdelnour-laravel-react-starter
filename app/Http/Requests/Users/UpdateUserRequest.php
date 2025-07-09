<?php

namespace App\Http\Requests\Users;

use App\Models\User;
use App\Http\Requests\BaseRequest;

class UpdateUserRequest extends BaseRequest{
    
    public function authorize(): bool{
        return true;
    }

    public function rules(): array{
        $rules = User::$rules;
        $rules['email'] = 'required|email|unique:users,email,'.$this->route('user');
        $rules['phone'] = 'required|numeric|unique:users,phone,'.$this->route('user');
        $rules['role_id'] = 'integer|exists:roles,id';
        $rules['password'] = 'nullable';
        $rules['confirm_password'] = 'nullable';
        return $rules;
    }
}
