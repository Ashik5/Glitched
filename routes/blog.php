<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogsController;


Route::get('/blogs', [BlogsController::class, 'getBlogs'])->name('blogs.index');
Route::post('/createblog', [BlogsController::class, 'store'])->name('blogs.store');
Route::get('/createblog', [BlogsController::class, 'create'])->name('blogs.create');
