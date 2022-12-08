<?php

namespace Database\Seeders;

use App\Models\OrderDetail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class OrderDetailSeeder extends Seeder
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
        $order_details = $data['order_details'];
        foreach ($order_details as $order_detail) {
            OrderDetail::query()->updateOrCreate([
                //"id" => $cate['_id'],
                "order_id" => $order_detail['order_id'],
                "product_id" => $order_detail['product_id'],
                "quantity" => $order_detail['quantity'],
                "price" => $order_detail['price'],
                "subtotal" => $order_detail['subtotal'],
            ]);
        }
    }
}
