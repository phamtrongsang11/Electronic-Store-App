<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;
    protected $guarded = [];


    public function customer_coupons()
    {
        return $this->hasMany('App\Models\CustomerCoupon', 'coupon_id', 'id');
    }
}
