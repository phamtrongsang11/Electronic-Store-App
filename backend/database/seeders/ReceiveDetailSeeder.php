<?php

namespace Database\Seeders;

use App\Models\ReceiveDetail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ReceiveDetailSeeder extends Seeder
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
        $receive_details = $data['receive_details'];
        foreach ($receive_details as $receive_detail) {
            ReceiveDetail::query()->updateOrCreate([
                "receive_id" => $receive_detail['receive_id'],
                "product_id" => $receive_detail['product_id'],
                "quantity" => $receive_detail['quantity'],
                "price" => $receive_detail['price'],
                "subtotal" => $receive_detail['subtotal'],
            ]);
        }
    }
}
