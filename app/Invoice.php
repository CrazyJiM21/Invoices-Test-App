<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = ['school_name', 'description', 'amount', 'link', 'payer_name'];
}
