import React, { useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Search, Menu, ChevronDown } from "lucide-react"; 
import SwiperSlider from "@/Components/SwiperSlider/SwiperSlider";
import SectionDivider from "@/Components/SectionDivider/SectionDivider";

import Image1 from "../../../assets/image_1.png";
import Image2 from "../../../assets/image_2.png";
import Image3 from "../../../assets/image_3.png";
import Image4 from "../../../assets/image_4.png";
import SearchLogo from "../../../assets/SearchPage_logo.png"; 

function SearchPage({ auth }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedGame, setSelectedGame] = useState("Select Games");

    const gamesList = ["Action", "RPG", "Shooter", "Adventure", "Strategy"];

    const games = [
        { id: 1, title: "13 Exciting Games Kicking Off The New Year In January", image: Image1, author: "ProGamer", readTime: "6 min read" },
        { id: 2, title: "Strategies for Winning Battle Royale Matches", image: Image2, author: "GamingExpert", readTime: "7 min read" },
        { id: 3, title: "How to Build Your Gaming Setup on a Budget", image: Image3, author: "TechGuru", readTime: "5 min read" },
        { id: 4, title: "The Best Games of All Time", image: Image4, author: "Admin", readTime: "10 min read" },
    ];

    return (
        <Authenticated auth={auth}>
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex justify-center mb-12">
                        <img src={SearchLogo} alt="Search Page Logo" className="w-40 h-36 object-contain" />
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="What game are you looking for?"
                                className="w-full py-3 px-4 pl-12 rounded-full bg-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                  
                    <div className="flex justify-center space-x-8 mb-12">

                        {/* Dropdown Button */}
                        <div className="relative">
                            <button 
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

                        {/* Popularity Button */}
                        <button className="bg-[#231E60] px-4 py-2 rounded-full text-white">
                            Popularity
                        </button>
                    </div>

                    <SectionDivider />

                  
                    <div className="mb-16">
                        <SwiperSlider title="Reviews" items={games} />
                    </div>
                </div>
            </main>
        </Authenticated>
    );
}

export default SearchPage;
