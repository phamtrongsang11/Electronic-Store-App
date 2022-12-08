<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReceiveDetail extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function receive()
    {
        return $this->belongsTo('App\Models\Receive', 'receive_id');
    }

    public function product()
    {
        return $this->belongsTo('App\Models\Product', 'product_id');
    }
}
