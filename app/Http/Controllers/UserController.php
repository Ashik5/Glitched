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
        $user = auth()->user();

        // Only validate the fields that were actually submitted
        $rules = [];

        if ($request->has('name')) {
            $rules['name'] = 'string|max:255';
        }

        if ($request->has('email')) {
            $rules['email'] = 'email';
        }

        if ($request->hasFile('image')) {
            $rules['image'] = 'image|mimes:jpeg,png,jpg|max:2048';
        }

        $validatedData = $request->validate($rules);

        // Update only the validated fields
        if (isset($validatedData['name'])) {
            $user->name = $validatedData['name'];
        }

        if (isset($validatedData['email'])) {
            $user->email = $validatedData['email'];
        }

        if ($request->hasFile('image')) {
            // Handle file upload
            $imagePath = $request->file('image')->store('profile-images', 'public');
            $user->image = $imagePath;
        }

        $user->save();

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
        try {
            $user = User::findOrFail($id);
            $user->banned = true;
            $user->save();
    
            Blogs::where('author', $id)->update(['blog_banned' => true]);
    
            return response()->json(['message' => 'User banned successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to ban user', 'error' => $e->getMessage()], 500);
        }
    }
    

public function unBanUser($id)
{
    try {
        $user = User::findOrFail($id);

        if (!$user->banned) {
            return response()->json(['message' => 'User is already unbanned'], 400);
        }

        $user->banned = false;
        $user->save();

        // Unban all blogs authored by this user
        Blogs::where('author', $id)->update(['blog_banned' => false]);

        return response()->json(['message' => 'User unbanned successfully']);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error unbanning user', 'error' => $e->getMessage()], 500);
    }
}


    public function getUserData(Request $request): \Inertia\Response
    {
        $user = $request->user();

        return Inertia::render('Dashboard', [
            'user' => $user,
        ]);
    }

    public function editProfile()
    {
        return Inertia::render('edit', [
            'user' => auth()->user()
        ]);
    }
}
