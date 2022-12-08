<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $json = Storage::disk('local')->get('/json/data.json');
        $data = json_decode($json, true);
        $products = $data['products'];
        foreach ($products as $product) {
            Product::query()->updateOrCreate([

                "name" => $product['name'],
                "slug" => $product['slug'],
                "stock" => $product['countInStock'],
                "price" => $product['price'],
                "image" => $product['image'],
                "screen" => $product['screenSize'],
                "fcam" => 50,
                "bcam" => 8,
                "os" => $product['operatingSystem'],
                "cpu" => $product['cpu'],
                "gpu" => "Adreno 610",
                "ram" => $product['ram'],
                "rom" => $product['memoryStorage'],
                "battery" => 5000,
                "weight" => $product['weight'],
                "released" => $product['releasedDate'],
                "description" => $product['description'],
                "rating" => $product['rating'],
                "numReviews" => $product['numReviews'],
                "cate_id" => $product['category'],
                "brand_id" => $product['brand'],

            ]);
        }
    }
}
