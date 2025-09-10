<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BlogsController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth')->group(function () {
    Route::post('/user/update-profile', [UserController::class, 'updateProfile']);
});
// Route::post('/user/update-profile', [UserController::class, 'updateProfile']);

Route::middleware('auth')->group(function () {
    Route::put('/blogs/{id}', [BlogsController::class, 'updateBlog']);
});

Route::post('/upload-image', function (Request $request) {
    $path = $request->file('file')->store('blog-images', 'public');
    return response()->json(['location' => Storage::url($path)]);
});

Route::get('/users', [UserController::class, 'getAllUsers']);

Route::post('/users/{id}/ban', [UserController::class, 'banUser']);
Route::post('/users/{id}/unBan', [UserController::class, 'unBanUser']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile/edit', [ProfileController::class, 'editProfile'])->name('profile.edit');
    Route::patch('/profile/update', [ProfileController::class, 'updateProfile'])->name('profile.update');
});


