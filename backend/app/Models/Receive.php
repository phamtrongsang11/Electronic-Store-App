<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receive extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function employee()
    {
        return $this->belongsTo('App\Models\User', 'emp_id');
    }

    public function receive_details()
    {
        return $this->hasMany('App\Models\ReceiveDetail', 'receive_id');
    }
}
