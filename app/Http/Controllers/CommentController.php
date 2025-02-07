<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Display a listing of comments.
     */
    public function index()
    {
        $comments = Comment::with('user', 'blog')->get();
        return response()->json($comments);
    }

    /**
     * Store a newly created comment.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'blog_id' => 'required|exists:blogs,blog_id',
            'comment' => 'required|string|max:1000'
        ]);
        $validated['user_id'] = Auth::id();
        $comment = Comment::create($validated);
        return back()->with('success', 'Comment posted successfully');
    }

    /**
     * Display a specific comment.
     */
    public function show($id)
    {
        $comment = Comment::with('user', 'blog')->find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        return response()->json($comment);
    }

    /**
     * Update the specified comment.
     */
    public function update(Request $request, $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'comment' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $comment->update($request->only('comment'));

        return response()->json(['message' => 'Comment updated successfully', 'data' => $comment]);
    }
    /**
     * Remove the specified comment.
     */
    public function destroy($id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json(['message' => 'Comment not found'], 404);
        }

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
