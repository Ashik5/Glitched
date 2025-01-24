<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

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

        return response()->json([
            'message' => 'Profile updated successfully!',
            'user' => $user,
        ]);
    }
}
