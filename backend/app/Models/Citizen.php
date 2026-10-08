<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Citizen extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'documents' => 'array',
        'internal_timeline' => 'array',
        'shipping_timeline' => 'array',
    ];
}
