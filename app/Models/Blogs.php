<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Comment;
use App\Models\BlogLike;
use App\Models\Favourites;

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
        'status',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author', 'id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'blog_id', 'blog_id');
    }

    public function likes()
    {
        return $this->hasMany(BlogLike::class, 'blog_id')->where('type', 'like');
    }

    public function dislikes()
    {
        return $this->hasMany(BlogLike::class, 'blog_id')->where('type', 'dislike');
    }

    public function favourites()
    {
        return $this->hasMany(Favourites::class, 'blog_id', 'blog_id');
    }
}
