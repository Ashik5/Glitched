<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Blogs;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Update the user's profile (name, bio, image link).
     */
    public function updateProfile(ProfileUpdateRequest $request)
    {

        try {
            $user = Auth::user();

            $validated = $request->validate([
                'name' => 'nullable|string|max:255',
                'email' => 'nullable|string|email|max:255',
                'image' => 'nullable|image|max:2048'
            ]);

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('public/blogs');
                $validated['image'] = Storage::url($path);
            }
            else{
                $validated['image'] = $user->image;
            }
            $validated['password'] = $user->password;
            $user->update($validated);

            return redirect()->route('profile.index');
        } catch (\Exception $e) {
            \Log::error(" User update failed: " . $e->getMessage());
            return response()->json(['message' => 'User update failed', 'error' => $e->getMessage()], 500);
        }
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
}
