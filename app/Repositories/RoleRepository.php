<?php

namespace App\Repositories;

use App\Models\Role;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;


class RoleRepository extends BaseRepository {
   
    protected $fieldSearchable = [
        'name',
        'display_name',
        'created_at',
    ];
   
    public function getFieldsSearchable(): array {
        return $this->fieldSearchable;
    }
  
    public function model() {
        return Role::class;
    }


 

}
