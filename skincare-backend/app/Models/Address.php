<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = ['user_id', 'type', 'first_name', 'last_name', 'street', 'city', 'postcode', 'country', 'phone'];
}