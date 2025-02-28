<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Comment;

class Blogs extends Model
{
    use HasFactory;

    protected $primaryKey = 'blog_id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'title',
        'content',
        'image',
        'author',
        'tag',
        'category',
        'tag',
        'category',
        'likes',
        'dislikes',
        'comments',
        'status',
    ];

    protected $casts = [
        'comments' => 'array',
        'likes' => 'integer',
        'dislikes' => 'integer',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author', 'id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'blog_id', 'blog_id');
    }
}
