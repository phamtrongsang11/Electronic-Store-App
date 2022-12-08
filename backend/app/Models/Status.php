<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    use HasFactory;
    protected $guarded = [];


    public function orders()
    {
        return $this->hasMany('App\Models\Order', 'status_id', 'id');
    }
}
