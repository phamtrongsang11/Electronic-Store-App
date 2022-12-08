<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class CategorySeeder extends Seeder
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
        $cates = $data['categories'];
        foreach ($cates as $cate) {
            Category::query()->updateOrCreate([
                //"id" => $cate['_id'],
                "name" => $cate['name'],
                "image" => 'image/c1.jpg',
                "description" => $cate['description']
            ]);
        }
    }
}
