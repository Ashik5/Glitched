<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogsController;


Route::get('/blogs', [BlogsController::class, 'getBlogs'])->name('blogs.index');
Route::post('/createblog', [BlogsController::class, 'store'])->name('blogs.store');
Route::get('/createblog', [BlogsController::class, 'create'])->name('blogs.create');
Route::delete('/deleteblog', [BlogsController::class, 'deleteBlog'])->name('blogs.delete');
Route::put('/updateblog/{id}', [BlogsController::class, 'updateBlog'])->name('blogs.update');

