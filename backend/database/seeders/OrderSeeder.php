<?php

namespace Database\Seeders;

use App\Models\Order;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class OrderSeeder extends Seeder
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
        $orders = $data['orders'];
        foreach ($orders as $order) {
            Order::query()->updateOrCreate([
                //"id" => $cate['_id'],
                "name" => $order['name'],
                "phone" => $order['phone'],
                "address" => $order['address'],
                "city" => $order['city'],
                "date" => $order['date'],
                "payment_method" => $order['payment_method'],
                "is_paid" => $order['is_paid'],
                "paid_at" => $order['paid_at'],
                "is_delivered" => $order['is_delivered'],
                "delivered_at" => $order['delivered_at'],
                "items_price" => $order['items_price'],
                "shipping_price" => $order['shipping_price'],
                "tax_price" => $order['tax_price'],
                "total_price" => $order['total_price'],
                "cus_id" => $order['cus_id'],
                "emp_id" => $order['emp_id'],
                "status_id" => $order['status_id'],
            ]);
        }
    }
}
