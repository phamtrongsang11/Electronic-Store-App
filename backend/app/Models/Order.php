<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    
    protected $guarded = [];

    public function customer()
    {
        return $this->belongsTo('App\Models\User', 'cus_id');
    }

    public function employee()
    {
        return $this->belongsTo('App\Models\User', 'emp_id');
    }

    // public function childrenOrder()
    // {
    //     return $this->hasMany(Order::class, 'id')->with('orders');
    // }

    public function order_details()
    {
        return $this->hasMany('App\Models\OrderDetail', 'order_id');
    }

    public function statuses()
    {
        return $this->belongsTo('App\Models\Status', 'status_id');
    }
}
