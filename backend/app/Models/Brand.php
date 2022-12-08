<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function categories()
    {
        return $this->belongsTo('App\Models\Category', 'cate_id');
    }

    public function products()
    {
        return $this->hasMany('App\Models\Product', 'brand_id', 'id');
    }
}
