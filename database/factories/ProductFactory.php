<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use App\Models\ProductCategory;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{

    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_name' => $this->faker->words(3, true), // Generate 3 random words as product name
            'product_description' => $this->faker->sentence(), // Generate a sentence for the description
            'product_category_id' => $this->faker->numberBetween(1, 7), // Assume there are 10 categories
            'product_price' => $this->faker->randomFloat(2, 10, 1000), // Generate price between 10.00 and 1000.00
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
