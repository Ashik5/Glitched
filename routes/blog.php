<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogsController;
use App\Http\Controllers\CommentController;
use Inertia\Inertia;
use App\Models\Blogs;
use App\Models\User;
Route::get('/blogs', [BlogsController::class, 'getBlogs'])->name('blogs.index');
Route::get('/blog/{id}', [BlogsController::class, 'getBlogs'])->name('blogs.single');


Route::middleware('auth')->group(function () {
    Route::post('/createblog', [BlogsController::class, 'store'])->name('blogs.store');
    Route::get('/createblog', function () {
        return Inertia::render('Profile/CreateBlog');
    })->name('blogs.create');
    Route::delete('/deleteblog/{id}', [BlogsController::class, 'deleteBlog'])->name('blogs.delete');
    Route::delete('/deleteblog/{id}', [BlogsController::class, 'deleteBlog'])->name('blogs.delete');
    Route::get('/search', function () {
        return Inertia::render('Search/index');
    })->name('search');
    Route::put('/updateblog/{blog_id}', [BlogsController::class, 'updateBlog'])->name('blogs.update');
    Route::post('/addcomment', [CommentController::class, 'store'])->name('comments.store');
    Route::get('/editblog/{id}', [BlogsController::class, 'edit'])->name('blogs.edit');


});
Route::middleware('admin')->group(function () {
    Route::get('/admin', function () {
        $totalPosts = Blogs::with('author')->count();
        $pendingPosts = Blogs::with('author')->where('status', 'pending')->count();
        $totalUsers = User::count();

        $topUsers = User::withCount(['myPosts as posts_count'])
            ->orderByDesc('posts_count')
            ->take(5)
            ->get();
        $topBlogs = Blogs::withCount(['likes as likes_count'])
            ->orderByDesc('likes_count')
            ->take(5)
            ->get();

        return Inertia::render('Admin/stat', props: ['totalPosts' => $totalPosts, 'pendingPosts' => $pendingPosts, 'totalUsers' => $totalUsers, 'topUsers' => $topUsers, 'topBlogs' => $topBlogs]);
    })->name('blog.admin');
    Route::get('/admin/users', function () {
        return Inertia::render('Admin/users');
    })->name('blog.admin.users');
    Route::get('/admin/posts', function () {
        $blogs = Blogs::with('author')->where('status', 'pending')->get();
        $verifiedBlogs = Blogs::with('author')->where('status', 'approved')->get();
        return Inertia::render('Admin/posts', props: ['unverifiedBlogs' => $blogs, 'verifiedBlogs' => $verifiedBlogs]);
    })->name('blog.admin.posts');
});

Route::put('/blogs/bulk-approve', [BlogsController::class, 'bulkApprove'])->name('blogs.bulkApprove');


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/blogs/{blog_id}/like', [BlogsController::class, 'toggleLike'])->name('blog.like');
    Route::post('/blogs/{blog_id}/dislike', [BlogsController::class, 'toggleDislike'])->name('blog.dislike');
    Route::post('/blogs/{blog}/favourite', [BlogsController::class, 'toggleFavourite'])->name('blog.favourite');
});
Route::get('/search', function () {
    return Inertia::render('Search/index', [
        'blogs' => Blogs::with(['author', 'likes'])->where('status', 'approved')->get()
    ]);
})->name('search');
Route::get('/edit', function () {
    return Inertia::render('Profile/Edit');
})->name('profile.edit');
Route::get('/tips', [BlogsController::class, 'getTipsBlogs'])->name('blog.tips');
Route::get('/news', [BlogsController::class, 'getNewsBlogs'])->name('blog.news');