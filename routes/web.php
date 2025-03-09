<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BlogsController;
use App\Models\Blogs;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $featuredBlog = Blogs::with(['author','comments.user', 'likes', 'dislikes', 'favourites'])->where('status', 'approved')->latest()->first();
    $topBlogs = Blogs::with(['author','comments.user', 'likes', 'dislikes', 'favourites'])->where('status', 'approved')->orderByDesc('created_at')->limit(3)->get();
    $topTipsBlogs = Blogs::with(['author','comments.user', 'likes', 'dislikes', 'favourites'])->where('status', 'approved')->where('category', 'tips')->limit(5)->get();
    $topNewsBlogs = Blogs::with(['author','comments.user', 'likes', 'dislikes', 'favourites'])->where('status', 'approved')->where('category', 'news')->limit(5)->get();
    
    return Inertia::render('Welcome', [
        'featuredBlog' => $featuredBlog,
        'topBlogs' => $topBlogs,
        'topTipsBlogs' => $topTipsBlogs,
        'topNewsBlogs' => $topNewsBlogs,
    ]);
})->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'profileData'])->name('profile.index');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware('auth')->group(function () {
    Route::post('/user/update-profile', [UserController::class, 'updateProfile']);
});
Route::middleware('auth')->group(function () {
    Route::put('/blogs/{id}', [BlogsController::class, 'updateBlog']);
});
Route::get('/users', [UserController::class, 'getUserData'])->name('users.data');



require __DIR__.'/blog.php';
require __DIR__.'/auth.php';