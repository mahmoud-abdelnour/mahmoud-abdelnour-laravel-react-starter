<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class UserRepository extends BaseRepository {
    
    protected $fieldSearchable = [
        'name',
        'email',
        'phone',
        'created_at',
        'active'
    ];
    
    public function getFieldsSearchable(): array {
        return $this->fieldSearchable;
    }
    
    public function getAvailableRelations(): array {
        return array_values(User::$availableRelations);
    }

    public function model():string{
        return User::class;
    }



}
