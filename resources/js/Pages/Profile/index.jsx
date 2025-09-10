import React, { useState } from "react";
import { User, Edit as EditIcon, Star, FileText } from "lucide-react";
import Dashboard from "./Dashboard"; // Import your Dashboard component
import { router } from "@inertiajs/react";

const ProfilePage = (props) => {
    const [activeTab, setActiveTab] = useState("Posts");
    const [showFollowersModal, setShowFollowersModal] = useState(false);
    const [showFollowingModal, setShowFollowingModal] = useState(false);

    const favorites = props.user?.fav_posts || [];
    const posts = props.user?.my_posts || [];

    const followers = props.followers || [];
    const following = props.following || [];

    return (
        <div className="flex h-screen bg-[#1E1A4B] text-white overflow-hidden">
            {/* Sidebar - Using Dashboard Component with fixed position */}
            <div className="fixed h-screen">
                <Dashboard />
            </div>

            {/* Main Content - Scrollable with left margin to avoid overlap with dashboard */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
                {/* Profile Section */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
                        <img
                            src={props.user?.image}
                            alt={props.user?.name}
                            className="h-24 w-24 rounded-full"
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold">
                            {props.user?.name}
                        </h2>
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className="flex gap-8 text-gray-400 mt-2">
                                <span>Posts: {props.postsCount || 0}</span>
                            </div>
                            <div className="flex gap-8 text-gray-400 mt-2">
                                <span
                                    className="cursor-pointer"
                                    onClick={() => setShowFollowersModal(true)}
                                >
                                    Followers: {props.followerCount || 0}
                                </span>
                            </div>
                            <div className="flex gap-8 text-gray-400 mt-2">
                                <span
                                    className="cursor-pointer"
                                    onClick={() => setShowFollowingModal(true)}
                                >
                                    Following: {props.followingCount || 0}
                                </span>
                            </div>
                        </div>
                        <a
                            href={route("profile.edit")}
                            className="flex items-center gap-2 mt-3 text-blue-500 hover:text-blue-400"
                        >
                            <EditIcon className="w-4 h-4" />
                            Edit Profile
                        </a>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-6 mb-6">
                    <button
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === "Posts"
                                ? "bg-blue-600"
                                : "bg-gray-700 hover:bg-gray-600"
                        }`}
                        onClick={() => setActiveTab("Posts")}
                    >
                        <FileText className="inline-block mr-2" size={18} />
                        My Posts
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === "Favorites"
                                ? "bg-blue-600"
                                : "bg-gray-700 hover:bg-gray-600"
                        }`}
                        onClick={() => setActiveTab("Favorites")}
                    >
                        <Star className="inline-block mr-2" size={18} />
                        Favorites
                    </button>
                </div>

                {/* Dynamic Tab Content */}
                {activeTab === "Posts" ? (
                    <section>
                        <h3 className="text-xl font-bold mb-6">My Posts</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {posts.map((post, index) => (
                                <div
                                    onClick={() => {
                                        router.visit(
                                            route("blogs.single", {
                                                id: post.blog_id,
                                            })
                                        );
                                    }}
                                    key={index}
                                    className="bg-[#252538] rounded-lg overflow-hidden group cursor-pointer"
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <span className="text-sm text-gray-400">
                                            {post.game}
                                        </span>
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-lg font-semibold mt-1 group-hover:text-blue-500">
                                                {post.title}
                                            </h4>
                                            {/* Edit & Delete Buttons */}
                                            <div className="flex gap-2">
                                                {/* Edit Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent card click event
                                                        router.visit(
                                                            route(
                                                                "blogs.edit",
                                                                {
                                                                    id: post.blog_id,
                                                                }
                                                            )
                                                        );
                                                    }}
                                                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500"
                                                >
                                                    Edit
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent card click event
                                                        if (
                                                            confirm(
                                                                "Are you sure you want to delete this post?"
                                                            )
                                                        ) {
                                                            router.delete(
                                                                route(
                                                                    "blogs.delete",
                                                                    {
                                                                        id: post.blog_id,
                                                                    }
                                                                )
                                                            );
                                                        }
                                                    }}
                                                    className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : (
                    <section>
                        <h3 className="text-xl font-bold mb-6">Favorites</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {favorites.map((post, index) => (
                                <div
                                    onClick={() => {
                                        router.visit(
                                            route("blogs.single", {
                                                id: post.blog_id,
                                            })
                                        );
                                    }}
                                    key={index}
                                    className="bg-[#252538] rounded-lg overflow-hidden group cursor-pointer"
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <span className="text-sm text-gray-400">
                                            {post.game}
                                        </span>
                                        <h4 className="text-lg font-semibold mt-1 group-hover:text-blue-500">
                                            {post.title}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Followers Modal */}
                {showFollowersModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#252538] rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Followers</h3>
                                <button
                                    onClick={() => setShowFollowersModal(false)}
                                    className="text-gray-400 hover:text-white text-xl"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="space-y-3">
                                {followers.map((follower) => (
                                    <div
                                        onClick={() => {
                                            router.visit(
                                                route("author.profile.index", {
                                                    id: followerid,
                                                })
                                            );
                                        }}
                                        key={follower.id}
                                        className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer"
                                    >
                                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                                            <User size={20} />
                                        </div>
                                        <span>{follower.name}</span>
                                    </div>
                                ))}
                                {followers.length === 0 && (
                                    <div>No followers found.</div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Following Modal */}
                {showFollowingModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#252538] rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold">Following</h3>
                                <button
                                    onClick={() => setShowFollowingModal(false)}
                                    className="text-gray-400 hover:text-white text-xl"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="space-y-3">
                                {following.map((person) => (
                                    <div
                                        onClick={() => {
                                            router.visit(
                                                route("author.profile.index", {
                                                    id: person.id,
                                                })
                                            );
                                        }}
                                        key={person.id}
                                        className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer"
                                    >
                                        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                                            <User size={20} />
                                        </div>
                                        <span>{person.name}</span>
                                    </div>
                                ))}
                                {following.length === 0 && (
                                    <div>No following found.</div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ProfilePage;
