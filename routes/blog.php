<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogsController;


Route::get('/blogs', [BlogsController::class, 'getBlogs'])->name('blogs.index');
