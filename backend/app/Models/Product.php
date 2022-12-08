<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $guarded = [];


    public function categories()
    {
        return $this->belongsTo('App\Models\Category', 'cate_id');
    }


    public function brands()
    {
        return $this->belongsTo('App\Models\Brand', 'brand_id');
    }

    public function reviews()
    {
        return $this->hasMany('App\Models\Review', 'product_id', 'id');
    }

    public function wishlists()
    {
        return $this->hasMany('App\Models\WishList', 'product_id', 'id');
    }

    public function order_details()
    {
        return $this->hasMany('App\Models\OrderDetail', 'product_id', 'id');
    }

    public function product_images()
    {
        return $this->hasMany('App\Models\ProductImage', 'product_id', 'id');
    }
}
