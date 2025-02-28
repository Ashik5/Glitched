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

    // Ensure the primary key is not assumed to be 'id'
    public $incrementing = true;

    // Specify the data type of the primary key
    protected $keyType = 'int';
    /**
     * Mass assignable attributes.
     */
    protected $fillable = [
        'title',
        'content',
        'image',
        'author',
        'tag',
        'category',
        'likes',
        'dislikes',
        'comments',
        'status',
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
    public function author()
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
