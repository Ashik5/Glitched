<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blogs;
use Illuminate\Support\Facades\Auth;

class BlogsController extends Controller
{
    /**
     * Create a new blog post
     */
    public function createBlog(Request $request)
    {
        try {
            // Check if user is authenticated
            if (!Auth::check()) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            // Validate the incoming request
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'desc' => 'required|string',
                'image' => 'url|nullable',
                'tags' => 'required|string',
                'category' => 'required|string',
            ]);

            $blog = Blogs::create([
                'title' => $validated['title'],
                'desc' => $validated['desc'],
                'author' => Auth::id(),
                'image' => $validated['image'] ?? null,
                'tags' => $validated['tags'],
                'category' => $validated['category'],
                'likes' => 0,
                'dislikes' => 0,
                'comments' => json_encode([]),
            ]);

            // Return a response
            return response()->json([
                'message' => 'Blog created successfully!',
                'blog' => $blog,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Blog creation failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update an existing blog
     */
    public function updateBlog(Request $request, $id)
    {
        try {
            // Check if user is authenticated
            if (!Auth::check()) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            // Find the blog by ID
            $blog = Blogs::findOrFail($id);

            // Validate the incoming data
            $validatedData = $request->validate([
                'title' => 'string|max:255|nullable',
                'desc' => 'string|nullable',
                'image' => 'url|nullable',
                'tags' => 'string|nullable',
                'category' => 'string|nullable',
            ]);

            // Update the fields if provided
            if ($request->has('title')) $blog->title = $validatedData['title'];
            if ($request->has('desc')) $blog->desc = $validatedData['desc'];
            if ($request->has('image')) $blog->image = $validatedData['image'];
            if ($request->has('tags')) $blog->tags = $validatedData['tags'];
            if ($request->has('category')) $blog->category = $validatedData['category'];

            $blog->save(); // Save changes to the database

            return response()->json([
                'message' => 'Blog updated successfully!',
                'blog' => $blog,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Blog update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
