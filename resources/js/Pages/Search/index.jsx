import React, { useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Search, ChevronDown } from "lucide-react";
import SectionDivider from "@/Components/SectionDivider/SectionDivider";
import { usePage } from "@inertiajs/react";
import SearchLogo from "../../../assets/SearchPage_logo.png";

function SearchPage({ auth }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState("Select Games");
    const [searchTerm, setSearchTerm] = useState("");

    const gamesList = ["Counter Strike", "Valorant"];

    const { blogs = [] } = usePage().props;

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Authenticated auth={auth}>
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-center mb-12">
                        <img
                            src={SearchLogo}
                            alt="Search Page Logo"
                            className="w-40 h-36 object-contain"
                        />
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for a blog..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-3 px-4 pl-12 rounded-full bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Dropdown & Popularity Buttons */}
                    <div className="flex justify-center space-x-8 mb-12">
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                                className="flex items-center space-x-2 bg-[#231E60] px-4 py-2 rounded-full text-white"
                            >
                                <span>{selectedGame}</span>
                                <ChevronDown size={18} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute left-0 mt-2 w-40 bg-[#231E60] rounded-lg shadow-lg z-50">
                                    {gamesList.map((game, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSelectedGame(game);
                                                setIsDropdownOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 hover:bg-[#2D277B] text-white"
                                        >
                                            {game}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button className="bg-[#231E60] px-4 py-2 rounded-full text-white">
                            Popularity
                        </button>
                    </div>

                    <SectionDivider />

                    {/* Filtered Blog Results */}
                    <div className="mb-16">
                        {filteredBlogs.length > 0 ? (
                            filteredBlogs.map((blog) => (
                                <div
                                    key={blog.id}
                                    className="mb-8 border-b pb-4"
                                >
                                    <h2 className="text-2xl font-bold">
                                        {blog.title}
                                    </h2>
                                    <p className="text-gray-600">
                                        {blog.author?.name || "Unknown Author"}
                                    </p>
                                    <p className="mt-2 text-gray-700">
                                        {blog.content.substring(0, 150)}...
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">
                                No blogs found.
                            </p>
                        )}
                    </div>
                </div>
            </main>
        </Authenticated>
    );
}

export default SearchPage;
