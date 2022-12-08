<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function brands()
    {
        return $this->hasMany('App\Models\Brand', 'brand_id', 'id');
    }
    public function products()
    {
        return $this->hasMany('App\Models\Product', 'cate_id', 'id');
    }
}
