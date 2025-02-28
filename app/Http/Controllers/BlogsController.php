<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use App\Models\Blogs;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BlogsController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'required',
            'tag' => 'required|in:valorant,csgo',
            'category' => 'required|in:tips,news',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/blogs');
            $validated['image'] = Storage::url($path);
        }

        $validated['author'] = Auth::id();
        $validated['likes'] = 0;
        $validated['dislikes'] = 0;
        $validated['comments'] = [];

        $blog = Blogs::create($validated);

        return redirect()->route('blogs.index')
            ->with('success', 'Blog created successfully.');
    }
    /**
     * Get all the blogs or a specific blog by ID
     */
    public function getBlogs(Request $request, $id = null)
    {
        try {
            if ($id) {
                $blog = Blogs::with(['author', 'comments.user'])->findOrFail($id);
                return Inertia::render('Blog/SingleBlog', ['blog' => $blog]);
            }

            // Start with the query builder for approved blogs
            $query = Blogs::where('status', 'approved');

            // Apply category filter if present
            if ($request->has('category')) {
                $query->where('category', $request->input('category'));
            }

            // Apply tags filter if present
            if ($request->has('tags')) {
                $query->where('tags', 'like', '%' . $request->input('tags') . '%');
            }

            // Execute the query with pagination
            $blogs = $query->paginate(10);

            return Inertia::render('Blog/Index', ['blogs' => $blogs, 'filters' => $request->only(['category', 'tags'])]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch blogs', 'error' => $e->getMessage()], 500);
        }
    }


    /**
     * Look up blogs by title
     */
    public function searchByTitle(Request $request)
    {
        $request->validate(['title' => 'required|string']);
        $blogs = Blogs::where('title', 'like', '%' . $request->input('title') . '%')->get();
        return response()->json(['message' => 'Blogs fetched successfully!', 'blogs' => $blogs], 200);
    }

    /**
     * Look up blogs by category
     */
    public function searchByCategory(Request $request)
    {
        $request->validate(['category' => 'required|string']);
        $blogs = Blogs::where('category', $request->input('category'))->get();
        return response()->json(['message' => 'Blogs fetched successfully!', 'blogs' => $blogs], 200);
    }

    /**
     * Look up blogs by tags
     */
    public function searchByTags(Request $request)
    {
        $request->validate(['tags' => 'required|string']);
        $blogs = Blogs::where('tags', 'like', '%' . $request->input('tags') . '%')->get();
        return response()->json(['message' => 'Blogs fetched successfully!', 'blogs' => $blogs], 200);
    }

    /**
     * Update an existing blog
     */
    public function updateBlog(Request $request, $id)
    {
        try {
            // if (!Auth::check()) {
            //     return response()->json(['message' => 'Unauthorized'], 401);
            // }

            $blog = Blogs::findOrFail($id);
            $validated = $request->validate([
                'title' => 'string|max:255|nullable',
                'desc' => 'string|nullable',
                'image' => 'url|nullable',
                'tags' => 'string|nullable',
                'category' => 'string|nullable',
                'status' => 'string|nullable',
            ]);

            $blog->update($validated);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Blog update failed', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Delete a blog
     */
    public function deleteBlog(Request $request, $id)
    {
        try {
            if (!Auth::check()) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }
            if (!$id) {
                return response()->json(['message' => 'No ID provided'], 400);
            }
            $blog = Blogs::where('blog_id', $id)->firstOrFail();
            $blog->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete blog', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Show the blog creation form
     */
    public function create()
    {
        return Inertia::render('Blog/CreateBlog');
    }
}