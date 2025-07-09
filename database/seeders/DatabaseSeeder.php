<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Seeder;
use Eloquent;
use DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //User::factory(20)->create();

        //Product::factory()->count(50)->create();

        //ProductCategory::factory()->count(7)->create();

       /*  User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]); */


        Eloquent::unguard();
        $path = storage_path('app/db.sql');
        DB::unprepared(file_get_contents($path));
        $this->command->info('Database  seeded!');


    }
}
