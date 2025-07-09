<?php

namespace App\Models;

use App\Models\Contracts\JsonResourceful;
use App\Traits\HasJsonResourcefulData;
use Eloquent as Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Permission extends BaseModel implements JsonResourceful {
    
    use HasFactory, HasJsonResourcefulData;

    protected $table = 'permissions';

    const JSON_API_TYPE = 'permissions';

    protected $fillable = [
        'name',
        'guard_name',
    ];
    
    public function prepareLinks(): array
    {
        return [
            //  "self" => route('permissions.show', $this->id),
        ];
    }

    public function prepareAttributes(): array
    {
        $fields = [
            'name' => $this->name,
            'display_name' => $this->display_name,
        ];

        return $fields;
    }
}
