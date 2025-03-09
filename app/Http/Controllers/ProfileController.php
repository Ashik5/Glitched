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
        $user_id = auth()->id();
        $user = User::with(['myPosts', 'favPosts'])->findOrFail($user_id);
        return Inertia::render('Profile/index', [
            'user' => $user,
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
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
