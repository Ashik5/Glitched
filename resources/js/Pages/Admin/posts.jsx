import React, { useState } from "react";
import { CheckCircle, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import Dashboard from "./dashboard";
import { useForm, router } from "@inertiajs/react";

const AdminPanel = (props) => {
    const { put } = useForm({
        status: "approved",
    });
    const { delete: deleteBlog } = useForm();

    const { unverifiedBlogs: unverifiedPosts } = props;
    const { verifiedBlogs: verifiedPosts } = props;

    // Approve single post
    const handleApprove = (id) => {
        put(route("blogs.update", id));
    };

    // Delete single post
    const handleDelete = (id) => {
        deleteBlog(route("blogs.delete", id));
    };

    return (
        <div className="flex h-screen bg-[#1E1A4B] text-white">
            <Dashboard />
            <main className="flex-1 p-6 overflow-y-auto">
                <h3 className="text-xl font-semibold mt-6 mb-2">
                    Unverified Posts
                </h3>

                <div className="bg-gray-800 p-4 rounded-md">
                    {unverifiedPosts.length === 0 ? (
                        <p className="text-gray-400">No unverified posts.</p>
                    ) : (
                        <>
                            {unverifiedPosts.map((post) => (
                                <div
                                    key={post.blog_id}
                                    className="flex justify-between items-center bg-gray-700 p-3 rounded-md mb-2"
                                >
                                    <div className="flex items-center">
                                        <div>
                                            <p className="text-lg">
                                                {post.title}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                {post.author.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() =>
                                                handleApprove(post.blog_id)
                                            }
                                            className="flex items-center bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                        >
                                            <CheckCircle
                                                size={16}
                                                className="mr-1"
                                            />{" "}
                                            Approve
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(post.blog_id)
                                            }
                                            className="flex items-center bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                        >
                                            <Trash2
                                                size={16}
                                                className="mr-1"
                                            />{" "}
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-2">
                    Verified Posts
                </h3>

                <div className="bg-gray-800 p-4 rounded-md">
                    {verifiedPosts.length === 0 ? (
                        <p className="text-gray-400">No verified posts.</p>
                    ) : (
                        verifiedPosts.map((post) => (
                            <div
                                key={post.blog_id}
                                className="flex justify-between items-center bg-gray-700 p-3 rounded-md mb-2"
                            >
                                <div>
                                    <p className="text-lg">{post.title}</p>
                                    <p className="text-gray-400 text-sm">
                                        {post.author.name}
                                    </p>
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => {
                                            router.visit(
                                                route("blogs.single", {
                                                    id: post.blog_id,
                                                })
                                            );
                                        }}
                                        className="flex items-center bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                    >
                                        <SquareArrowOutUpRight
                                            size={16}
                                            className="mr-1"
                                        />{" "}
                                        View Blog
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(post.blog_id)
                                        }
                                        className="flex items-center bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                    >
                                        <Trash2 size={16} className="mr-1" />{" "}
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
