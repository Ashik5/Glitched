import React, { useState } from "react";
import { User, Edit as EditIcon, Star, FileText } from "lucide-react";
import Dashboard from "../Profile/Dashboard"; // Import your Dashboard component

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("Posts");

    const favorites = [
        {
            title: "Marvel Rivals",
            image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?auto=format&fit=crop&q=80&w=400",
        },
        {
            title: "Red Dead Redemption 2",
            image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=400",
        },
    ];

    const posts = [
        {
            title: "13 Exciting Games Kicking Off The New Year",
            game: "Fortnite",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400",
        },
        {
            title: "Best Open World Games of 2024",
            game: "Red Dead Redemption 2",
            image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=400",
        },
    ];

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar - Using Dashboard Component */}
            <Dashboard />

            {/* Main Content */}
            <main className="flex-1 p-8">
                {/* Profile Section */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">ANTIK DHAR</h2>
                        <div className="flex gap-8 text-gray-400 mt-2">
                            <span>Posts: 18</span>
                        </div>
                        <button className="flex items-center gap-2 mt-3 text-blue-500 hover:text-blue-400">
                            <EditIcon className="w-4 h-4" />
                            Edit Profile
                        </button>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {posts.map((post, index) => (
                                <div
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
                ) : (
                    <section>
                        <h3 className="text-xl font-bold mb-6">Favorites</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {favorites.map((game, index) => (
                                <div
                                    key={index}
                                    className="relative rounded-lg overflow-hidden group"
                                >
                                    <img
                                        src={game.image}
                                        alt={game.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                        <h4 className="text-lg font-semibold">
                                            {game.title}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default ProfilePage;
