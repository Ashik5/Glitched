import React, { useState, useEffect } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Search, ChevronDown } from "lucide-react"; 
import SwiperSlider from "@/Components/SwiperSlider/SwiperSlider";
import SectionDivider from "@/Components/SectionDivider/SectionDivider";
import { router } from "@inertiajs/react";

import Image1 from "../../../assets/image_1.png";
import Image2 from "../../../assets/image_2.png";
import Image3 from "../../../assets/image_3.png";
import Image4 from "../../../assets/image_4.png";
import SearchLogo from "../../../assets/SearchPage_logo.png"; 

function SearchPage({ auth, blogs = [], filters = {} }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState(filters.tags || "Select Games");
    const [searchQuery, setSearchQuery] = useState(filters.title || "");
    const [isLoading, setIsLoading] = useState(false);

    // Adjust these to match your backend validation
    const gamesList = ["valorant", "csgo"];
    const categories = ["tips", "news"];

    // Default games data for initial display
    const defaultGames = [
        { id: 1, title: "13 Exciting Games Kicking Off The New Year In January", image: Image1, author: "ProGamer", readTime: "6 min read" },
        { id: 2, title: "Strategies for Winning Battle Royale Matches", image: Image2, author: "GamingExpert", readTime: "7 min read" },
        { id: 3, title: "How to Build Your Gaming Setup on a Budget", image: Image3, author: "TechGuru", readTime: "5 min read" },
        { id: 4, title: "The Best Games of All Time", image: Image4, author: "Admin", readTime: "10 min read" },
    ];

    // Format blog results for display
    const formatBlogData = (data) => {
        if (!data || !Array.isArray(data) || data.length === 0) return [];
        
        return data.map(blog => ({
            id: blog.blog_id,
            title: blog.title,
            image: blog.image || Image1, // Fallback image if none provided
            author: blog.author?.name || "Unknown",
            readTime: "5 min read",
            content: blog.content,
            category: blog.category,
            tag: blog.tag
        }));
    };

    // Handle search by title
    const handleTitleSearch = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        router.get(route("blogs.index"), {
            title: searchQuery
        }, {
            preserveState: true,
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    // Handle search by tag
    const handleTagSearch = (tag) => {
        setIsLoading(true);
        
        router.get(route("blogs.index"), {
            tags: tag
        }, {
            preserveState: true,
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    // Handle filter by category
    const handleCategoryFilter = (category) => {
        setIsLoading(true);
        
        router.get(route("blogs.index"), {
            category: category
        }, {
            preserveState: true,
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    // Apply tag search when game selection changes
    useEffect(() => {
        if (selectedGame !== "Select Games") {
            handleTagSearch(selectedGame);
        }
    }, [selectedGame]);

    // Navigate to single blog page
    const viewBlog = (blogId) => {
        router.visit(route("blogs.show", blogId));
    };

    // Determine whether to show search results or default content
    const displayItems = blogs && blogs.length > 0 
        ? formatBlogData(blogs) 
        : defaultGames;

    return (
        <Authenticated auth={auth}>
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-center mb-12">
                        <img src={SearchLogo} alt="Search Page Logo" className="w-40 h-36 object-contain" />
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleTitleSearch} className="max-w-2xl mx-auto mb-12">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="What game are you looking for?"
                                className="w-full py-3 px-4 pl-12 rounded-full bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <button 
                                type="submit"
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-purple-500 text-white py-1 px-4 rounded-full text-sm hover:bg-purple-600"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-center space-x-8 mb-12">
                        {/* Game Tag Dropdown */}
                        <div className="relative">
                            <button 
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                                className="flex items-center space-x-2 bg-[#231E60] px-4 py-2 rounded-full text-white"
                            >
                                <span>{selectedGame}</span>
                                <ChevronDown size={18} />
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute left-0 mt-2 w-40 bg-[#231E60] rounded-lg shadow-lg z-50">
                                    {gamesList.map((game, index) => (
                                        <button
                                            key={index}
                                            type="button"
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

                        {/* Category Filter Buttons */}
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => handleCategoryFilter(category)}
                                className={`bg-[#231E60] px-4 py-2 rounded-full text-white ${
                                    filters.category === category ? 'ring-2 ring-purple-400' : ''
                                }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>

                    <SectionDivider />

                    {/* Loading indicator */}
                    {isLoading && (
                        <div className="flex justify-center my-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                        </div>
                    )}

                    {/* Display Results */}
                    <div className="mb-16">
                        <SwiperSlider 
                            title={blogs && blogs.length > 0 ? "Search Results" : "Featured Blogs"} 
                            items={displayItems}
                            onItemClick={viewBlog}
                        />
                    </div>
                </div>
            </main>
        </Authenticated>
    );
}

export default SearchPage;