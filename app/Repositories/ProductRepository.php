<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductRepository extends BaseRepository {
    
    protected $fieldSearchable = [
        'product_name',
        'price',
        'created_at',
    ];
  
    public function getFieldsSearchable(): array {
        return $this->fieldSearchable;
    }
    
    public function getAvailableRelations(): array {
        return array_values(Product::$availableRelations);
    }
    
    public function model():string{
        return Product::class;
    }


}
