<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Comment;

class Blogs extends Model
{
    use HasFactory;

    /**
     * The primary key associated with the table.
     */
    protected $primaryKey = 'blog_id';

    /**
     * Mass assignable attributes.
     */
    protected $fillable = [
        'title',
        'content',
        'image',
        'author',
        'tag', // kon game (valorant ? csgo)
        'category', // kon type er post (Tips or tricks naki news)
        'likes',
        'dislikes',
        'comments',
    ];

    /**
     * Attribute casting.
     */
    protected $casts = [
        'comments' => 'array',
        'likes' => 'integer',
        'dislikes' => 'integer',
    ];

    /**
     * Relationship with User.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'author', 'id');
    }

    /**
     * Relationship with Comments.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class, 'blog_id', 'blog_id');
    }
}
