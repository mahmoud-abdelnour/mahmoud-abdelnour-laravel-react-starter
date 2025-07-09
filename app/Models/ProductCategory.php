<?php 
namespace App\Models;

use PDO;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class ProductCategory extends Model
{

    use HasFactory;

    protected $table = 'product_categories';

    const JSON_API_TYPE = 'product-product_categories';

    public static $rules = [
        'name' => 'required',
    ];

    protected $fillable = [
        'name',
    ];

    public function prepareLinks(): array {
        return [
            //'self' => route('categories.show', $this->id),
        ];
    }
    
    public function prepareAttributes(): array {
        $fields = [
            'name' => $this->name,
            'products_count' => $this->products()->count(),
        ];

        return $fields;
    }

    public function products() : HasMany {
        return $this->hasMany(Product::class, 'product_category_id', 'id');
    }


}