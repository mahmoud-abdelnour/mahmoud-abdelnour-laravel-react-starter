<?php

namespace App\Repositories;

use App\Models\Permission;
use Exception;


class PermissionRepository extends BaseRepository {
   
    protected $fieldSearchable = [
        'name',
        'created_at',
    ];
   
    public function getFieldsSearchable(): array {
        return $this->fieldSearchable;
    }
  
    public function model() {
        return Permission::class;
    }


 

}
