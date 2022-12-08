<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ReviewSeeder extends Seeder
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
        $reviews = $data['reviews'];
        foreach ($reviews as $review) {
            Review::query()->updateOrCreate([
                "rating" => $review['rating'],
                "comment" => $review['comment'],
                "user_id" => $review['user_id'],
                "product_id" => $review['product_id'],
            ]);
        }
    }
}
