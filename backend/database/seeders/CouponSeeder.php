<?php

namespace Database\Seeders;

use App\Models\Coupon;
use App\Models\CustomerCoupon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class CouponSeeder extends Seeder
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
        $coupons = $data['coupons'];
        foreach ($coupons as $coupon) {
            Coupon::query()->updateOrCreate([
                "id" => $coupon['id'],
                "name" => $coupon['name'],
                "percent" => $coupon['percent'],
                "apply" => $coupon['apply'],
                "is_active" => $coupon['is_active']
            ]);
        }

        $customer_coupons = $data['customer_coupons'];
        foreach ($customer_coupons as $cus_coupon) {
            CustomerCoupon::query()->updateOrCreate([
                "coupon_id" => $cus_coupon['coupon_id'],
                "cus_id" => $cus_coupon['cus_id'],
                "is_used" => $cus_coupon['is_used']
            ]);
        }
    }
}
