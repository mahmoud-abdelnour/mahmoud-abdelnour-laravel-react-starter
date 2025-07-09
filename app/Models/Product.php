<?php 
namespace App\Models;

use PDO;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{

    use HasFactory;

    const JSON_API_TYPE = 'products';

    public const PATH = 'product_image';
    
    public static $rules = [
        'product_name' => 'required',
        'product_description' => 'required',
        'product_category_id' => 'required|exists:product_categories,id',
        'product_price' => 'required|numeric',
        'images.*' => 'image|mimes:jpg,jpeg,png',

    ];

    protected $fillable = [
        'product_name',
        'product_description',
        'product_category_id',
        'product_price',
    ];

    public function prepareLinks(): array {
        return [
            //'self' => route('products.show', $this->id),
        ];
    }

    public function prepareAttributes(): array {
        $fields = [
            'product_name' => $this->product_name,
            'product_description' => $this->product_description,
            'phone' => $this->phone,
            'image' => $this->image_url,
            'category' => $this->category,
            'created_at' => $this->created_at,
        ];

        return $fields;
    }

    public function category() : BelongsTo {
        return $this->belongsTo(ProductCategory::class, 'product_category_id', 'id');
    }
}