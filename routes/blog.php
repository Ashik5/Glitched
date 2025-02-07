<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogsController;
use Inertia\Inertia;

Route::get('/blogs', [BlogsController::class, 'getBlogs'])->name('blogs.index');
Route::post('/createblog', [BlogsController::class, 'store'])->name('blogs.store');
Route::get('/createblog', function(){
    return Inertia::render('Blog/CreateBlog');
})->name('blogs.create');
Route::delete('/deleteblog', [BlogsController::class, 'deleteBlog'])->name('blogs.delete');
Route::get('/search', function () {
    return Inertia::render('Search/index');
})->name('search');
Route::put('/updateblog/{id}', [BlogsController::class, 'updateBlog'])->name('blogs.update');
Route::get('/singleblog', function () {
    return Inertia::render('Blog/SingleBlog');
})->name('blog.single');