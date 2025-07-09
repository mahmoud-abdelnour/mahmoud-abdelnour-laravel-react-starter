<?php

namespace App\Models;

use App\Traits\HasJsonResourcefulData;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as RoleModel;

class Role extends RoleModel 
{

    use HasFactory, HasJsonResourcefulData;

    protected $table = 'roles';

    const JSON_API_TYPE = 'roles';

    public $guard_name = 'web';

    protected $fillable = [
        'name',
        'display_name',
        'guard_name',
    ];

    const ADMIN = 'admin';

    public static $rules = [
        'name' => 'required|unique:roles',
        //'permissions' => 'required',
    ];

    public function prepareLinks(): array
    {
        return [
            'self' => route('roles.show', $this->id),
        ];
    }

    public function prepareAttributes(): array
    {
        $fields = [
            'name' => $this->name,
            'display_name' => $this->display_name,
            'permissions' => $this->permissions,
            'created_at' => $this->created_at,
        ];

        return $fields;
    }
}
