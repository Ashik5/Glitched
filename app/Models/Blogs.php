<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blogs extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

     protected $primaryKey = 'blog_id';

    protected $fillable = [
        'title',
        'desc',
        'image',
        'author',
        'tag', // kon game (valorant ? csgo)
        'category', // kon type er post (Tips or tricks naki news)
        'likes',
        'dislikes',
        'comments',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'comments' => 'array', // Cast comments as an array
        'likes' => 'integer', // Cast likes as an integer
        'dislikes' => 'integer', // Cast dislikes as an integer
    ];
}
