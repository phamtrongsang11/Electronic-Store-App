<?php

namespace Database\Seeders;

use App\Models\ProductImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ProductImageSeeder extends Seeder
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
        $productimages = $data['productimages'];
        foreach ($productimages as $p) {
            ProductImage::query()->updateOrCreate([
                "product_id" => $p['product_id'],
                "image" => $p['image'],
            ]);
        }
    }
}
