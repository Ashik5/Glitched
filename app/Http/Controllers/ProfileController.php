<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{

    public function profileData(Request $request, $id = null): Response
    {
        $user_id = $id ?? auth()->id();
        $user = User::with(['myPosts', 'favPosts'])->findOrFail($user_id);
        $followerCount = $user->followers()->count();
        $followingCount = $user->following()->count();
        $postsCount = $user->myPosts()->count();
        $followers = $user->followers;
        $following = $user->following;
        return Inertia::render('Profile/index', [
            'user' => $user,
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'followerCount' => $followerCount,
            'followingCount' => $followingCount,
            'postsCount' => $postsCount,
            'followers' => $followers,
            'following' => $following,
        ]);
    }
    public function AuthorProfileData(Request $request, $id = null): Response
    {
        $user_id = $id;
        $user = User::with(['myPosts', 'favPosts'])->findOrFail($user_id);
        $isFollowing = auth()->user() ? auth()->user()->following->contains($user->id) : false;
        $followerCount = $user->followers()->count();
        $followingCount = $user->following()->count();
        $postsCount = $user->myPosts()->count();
        $myPosts = $user->myPosts;
        return Inertia::render('Profile/AuthorProfile', [
            'user' => $user,
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'isFollowing' => $isFollowing,
            'followerCount' => $followerCount,
            'followingCount' => $followingCount,
            'postsCount' => $postsCount,
            'myPosts' => $myPosts,
        ]);
    }
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request)
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
            } else {
                $validated['image'] = $user->image;
            }
            $validated['password'] = $user->password;
            $user->update($validated);

            return redirect()->route('profile.index', ['id' => $user->id]);
        } catch (\Exception $e) {
            \Log::error(" User update failed: " . $e->getMessage());
            return response()->json(['message' => 'User update failed', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
