<?php

namespace Database\Seeders;

use App\Models\WishList;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class WishListSeeder extends Seeder
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
        $wishlists = $data['wishlists'];

        foreach ($wishlists as $wishlist) {
            WishList::query()->updateOrCreate([
                "product_id" => $wishlist['product_id'],
                "cus_id" => $wishlist['cus_id'],

            ]);
        }
    }
}
