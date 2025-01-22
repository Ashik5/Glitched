<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Blog;

class BlogsController extends Controller
{

    public function createBlog(Request $request)
    {
    // Validate the incoming request
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'desc' => 'required|string',
        'image' => 'url|nullable',
        'tags' => 'required|string', // kon game (valorant ? csgo)
        'category' => 'required|string', //ki type er post
    ]);

    $blog = Blog::create([
        'title' => $validated['title'],
        'desc' => $validated['desc'],
        'author' => $user->id, // eta kaj korbe kina janii na
        'image' => $validated['image'] ?? null, 
        'tags' => $validated['tags'], 
        'category' => $validated['category'], 
        'likes' => 0, 
        'dislikes' => 0, 
        'comments' => '[]', 
    ]);

    // Return a response
    return response()->json([
        'message' => 'Blog created successfully!',
        'blog' => $blog,
    ], 201);
}

    /**
     * Update an existing blog.
     */
    public function updateBlog(Request $request, $id)
    {
        // Find the blog by ID
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json(['message' => 'Blog not found!'], 404);
        }

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
    }
}
