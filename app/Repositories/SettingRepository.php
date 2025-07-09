<?php

namespace App\Repositories;

use App\Models\Setting;
use Illuminate\Pagination\LengthAwarePaginator;

class SettingRepository extends BaseRepository {
    
    protected $fieldSearchable = [
        'key',
        'value',
    ];
  
    public function getFieldsSearchable(): array {
        return $this->fieldSearchable;
    }
    
    public function getAvailableRelations(): array {
        return array_values(Setting::$availableRelations);
    }
    
    public function model():string{
        return Setting::class;
    }


}
