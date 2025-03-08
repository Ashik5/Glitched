<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use App\Models\Blogs;
use App\Models\BlogLike;
use App\Models\Favourites;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BlogsController extends Controller
{
    public function store(Request $request)
    {

        $user = Auth::user();
        if ($user->banned) {
            return redirect()->route('blogs.index')
                ->with('error', 'You are banned from creating blogs.');
        }

        $validated = $request->validate([
            'title' => 'required|max:255',
            'content' => 'nullable|string',
            'tag' => 'required|string',
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

        return redirect()->route('profile.index')
            ->with('success', 'Blog created successfully.');
    }
    /**
     * Get all the blogs or a specific blog by ID
     */
    public function getBlogs(Request $request, $id = null)
    {
        try {
            if ($id) {
                if (!auth()->user()) {
                    return redirect()->route('welcome');
                }

                $user = auth()->user();
                $blog = Blogs::with(['author', 'comments.user', 'likes', 'dislikes', 'favourites'])->findOrFail($id);
                $userLiked = $blog->likes()->where('user_id', $user->id)->exists();
                $userDisliked = $blog->dislikes()->where('user_id', $user->id)->exists();
                $userFavorited = $blog->favourites()->where('user_id', $user->id)->exists();
                $relatedBlogs = Blogs::with('author')->where('tag', 'like', '%' . $blog->tag . '%')
                    ->where('blog_id', '!=', $blog->blog_id)
                    ->take(5)
                    ->get();
                return Inertia::render('Blog/SingleBlog', ['blog' => $blog, 'userLiked' => $userLiked, 'userDisliked' => $userDisliked, 'userFavorited' => $userFavorited, 'relatedBlogs' => $relatedBlogs]);
            }

            // Start with the query builder for approved blogs
            $query = Blogs::with('author')->where('status', 'approved')
                ->where('blog_banned', false);

            // Apply category filter if present
            // Start with the query builder for approved blogs


            // Apply category filter if present
            if ($request->has('category')) {
                $query->where('category', $request->input('category'));
                $query->where('category', $request->input('category'));
            }

            // Apply tags filter if present

            // Apply tags filter if present
            if ($request->has('tags')) {
                $query->where('tags', 'like', '%' . $request->input('tags') . '%');
                $query->where('tags', 'like', '%' . $request->input('tags') . '%');
            }

            // Execute the query with pagination
            $blogs = $query->paginate(10);
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
        $request->validate(['tag' => 'required|string']);
        $blogs = Blogs::where('tag', 'like', '%' . $request->input('tag') . '%')->get();
        return response()->json(['message' => 'Blogs fetched successfully!', 'blogs' => $blogs], 200);
    }
    /**
     * Update an existing blog
     */
    public function updateBlog(Request $request, $blog_id)  // Change $id to $blog_id
    {
        try {
            // Use 'blog_id' instead of 'id'
            $blog = Blogs::where('blog_id', $blog_id)->firstOrFail();

            $validated = $request->validate([
                'title' => 'string|max:255|nullable',
                'content' => 'string|nullable',
                'image' => 'nullable|image|max:2048',
                'tag' => 'string|nullable',
                'category' => 'string|nullable',
                'status' => 'string|nullable',
            ]);

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('public/blogs');
                $validated['image'] = $path;
            }
            $blog->update($validated);

            return back()->with('success', 'Blog updated successfully!');
        } catch (\Exception $e) {
            \Log::error(" Blog update failed: " . $e->getMessage());
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
    public function bulkApprove(Request $request)
    {
        $blogIds = $request->input('blogs');
        if (!$blogIds || count($blogIds) === 0) {
            return response()->json(['message' => 'No blogs selected'], 400);
        }

        Blogs::whereIn('blog_id', $blogIds)->update(['status' => 'approved']);
    }

    public function edit($id)
    {
        try {
            $blog = Blogs::where('blog_id', $id)->firstOrFail();

            return Inertia::render('Blog/EditBlog', [
                'blog' => $blog, // Pass the full blog object
            ]);
        } catch (\Exception $e) {
            return redirect()->route('blogs.index')->with('error', 'Blog not found');
        }
    }
    public function toggleLike(Request $request, $blog_id)
    {
        $user = Auth::user();
        $blog = Blogs::findOrFail($blog_id);

        // Check if the user already liked or disliked
        $existing = BlogLike::where('blog_id', $blog_id)
            ->where('user_id', $user->id)
            ->first();

        if ($existing) {
            if ($existing->type === 'like') {
                $existing->delete(); // Unlike
                return back()->with('success', 'Blog updated successfully!');
            } else {
                $existing->update(['type' => 'like']); // Switch dislike to like
                return back()->with('success', 'Blog updated successfully!');
            }
        }

        // Add new like
        BlogLike::create([
            'blog_id' => $blog_id,
            'user_id' => $user->id,
            'type' => 'like',
        ]);

        return back()->with('success', 'Blog updated successfully!');
    }

    public function toggleDislike(Request $request, $blog_id)
    {
        $user = Auth::user();
        $blog = Blogs::findOrFail($blog_id);

        // Check if the user already liked or disliked
        $existing = BlogLike::where('blog_id', $blog_id)
            ->where('user_id', $user->id)
            ->first();

        if ($existing) {
            if ($existing->type === 'dislike') {
                $existing->delete(); // Remove dislike
                return back()->with('success', 'Blog updated successfully!');
            } else {
                $existing->update(['type' => 'dislike']); // Switch like to dislike
                return back()->with('success', 'Blog updated successfully!');
            }
        }

        // Add new dislike
        BlogLike::create([
            'blog_id' => $blog_id,
            'user_id' => $user->id,
            'type' => 'dislike',
        ]);

        return back()->with('success', 'Blog updated successfully!');
    }

    public function toggleFavourite($blog_id)
    {
        $user_id = auth()->id();

        $existingFavourite = Favourites::where('blog_id', $blog_id)->where('user_id', $user_id)->first();

        if ($existingFavourite) {
            $existingFavourite->delete();
            return back()->with('success', 'Blog updated successfully!');
        } else {
            Favourites::create(['blog_id' => $blog_id, 'user_id' => $user_id]);
            return back()->with('success', 'Blog updated successfully!');
        }
    }

    public function getTipsBlogs(Request $request)
    {
        try {
            $query = Blogs::with('author')->where('status', 'approved')
                ->where('category', 'tips')
                ->where('blog_banned', false);

            // Apply tags filter if present
            if ($request->has('tags')) {
                $query->where('tags', 'like', '%' . $request->input('tags') . '%');
            }

            // Execute query with pagination
            $blogs = $query->paginate(10);

            return Inertia::render('Blog/Index', [
                'blogs' => $blogs,
                'filters' => $request->only(['tags']),
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch tips blogs', 'error' => $e->getMessage()], 500);
        }
    }

    public function getNewsBlogs(Request $request)
    {
        try {
            $query = Blogs::with('author')->where('status', 'approved')
                ->where('category', 'news')
                ->where('blog_banned', false);

            // Apply tags filter if present
            if ($request->has('tags')) {
                $query->where('tags', 'like', '%' . $request->input('tags') . '%');
            }

            // Execute query with pagination
            $blogs = $query->paginate(10);

            return Inertia::render('Blog/Index', [
                'blogs' => $blogs,
                'filters' => $request->only(['tags']),
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to fetch news blogs', 'error' => $e->getMessage()], 500);
        }
    }

}