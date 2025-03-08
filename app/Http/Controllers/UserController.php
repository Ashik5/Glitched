<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Blogs;

class UserController extends Controller
{
    /**
     * Update the user's profile (name, bio, image link).
     */
    public function updateProfile(Request $request)
    {
        $user = auth()->user(); // Get the authenticated user

        // Validate the incoming data
        $validatedData = $request->validate([
            'name' => 'string|max:255', 
            'bio' => 'string|nullable', 
            'image' => 'url|nullable',  
        ]);

        // Update the fields if provided
        if ($request->has('name')) $user->name = $validatedData['name'];
        if ($request->has('bio')) $user->bio = $validatedData['bio'];
        if ($request->has('image')) $user->image = $validatedData['image']; 

        $user->save(); // Save changes to the database

        return Inertia::render('Dashboard', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'message' => 'Profile updated successfully!',
            'user' => $user,
        ]);
    }

    public function getAllUsers()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function banUser($id)
    {
        $user = User::findOrFail($id);
        $user->banned = true;
        $user->save();

        
        Blogs::where('author', $id)->update(['blog_banned' => true]);

        return response()->json(['message' => 'User banned successfully']);
    }

    public function getUserData(Request $request): \Inertia\Response
    {
        $user = $request->user();

        return Inertia::render('Dashboard', [
            'user' => $user,
        ]);
    }
}
