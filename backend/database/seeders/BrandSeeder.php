<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class BrandSeeder extends Seeder
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
        $brands = $data['brands'];
        foreach ($brands as $brand) {
            Brand::query()->updateOrCreate([

                "name" => $brand['name'],
                "image" => 'image/b1.jpg',
                "description" => $brand['description'],
                "cate_id" => $brand['CateID'],
            ]);
        }
    }
}
