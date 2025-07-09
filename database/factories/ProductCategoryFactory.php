<?php 
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\ProductCategory;

class ProductCategoryFactory extends Factory
{
    protected $model = ProductCategory::class;

    public function definition()
    {
        return [
            'name' => $this->faker->word(),
        ];
    }
}