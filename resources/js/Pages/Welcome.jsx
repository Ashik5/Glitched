import React, { useState } from "react";
import Image1 from "../../assets/image_1.png";
import Image2 from "../../assets/image_2.png";
import Image3 from "../../assets/image_3.png";
import Image4 from "../../assets/image_4.png";
import ImageMain from "../../assets/image_main.png";
import Logo from "../../assets/Logo.svg";
import Footer_Logo from "../../assets/Footer_Logo.png";
import {
    Gamepad2,
    TrendingUp,
    Newspaper,
    Lightbulb,
    Search,
    User,
} from "lucide-react";
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord } from "react-icons/fa";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import SwiperSlider from "../Components/SwiperSlider/SwiperSlider";
import SectionDivider from "../Components/SectionDivider/SectionDivider";

function App() {
    const [activeSection, setActiveSection] = useState("trending");

    const newsItems = [
        {
            id: 1,
            title: "13 Exciting Games Kicking Off The New Year In January",
            image: Image2,
            author: "Admin",
            readTime: "3 min read",
        },
        {
            id: 2,
            title: "13 Exciting Games Kicking Off The New Year In January",
            image: Image3,
            author: "Admin",
            readTime: "3 min read",
        },
        {
            id: 3,
            title: "13 Exciting Games Kicking Off The New Year In January",
            image: Image4,
            author: "Admin",
            readTime: "3 min read",
        },
    ];
    const reviews = [
        {
            id: 1,
            title: "13 Exciting Games Kicking Off The New Year In January",
            image: Image1,
            author: "Admin",
            readTime: "3 min read",
        },
        {
            id: 2,
            title: "Apex Legends - Tips for Getting Started",
            image: Image2,
            author: "Admin",
            readTime: "5 min read",
        },
        {
            id: 3,
            title: "The Best Single Player Games of All Time",
            image: Image3,
            author: "Admin",
            readTime: "4 min read",
        },
        {
            id: 4,
            title: "The ames of All Time",
            image: Image4,
            author: "Admin",
            readTime: "10 min read",
        },
    ];

    const tipsAndTricks = [
        {
            id: 1,
            title: "13 Exciting Games Kicking Off The New Year In January",
            image: Image1,
            author: "ProGamer",
            readTime: "6 min read",
        },
        {
            id: 2,
            title: "Strategies for Winning Battle Royale Matches",
            image: Image2,
            author: "GamingExpert",
            readTime: "7 min read",
        },
        {
            id: 3,
            title: "How to Build Your Gaming Setup on a Budget",
            image: Image3,
            author: "TechGuru",
            readTime: "5 min read",
        },
        {
            id: 4,
            title: "The ames of All Time",
            image: Image4,
            author: "Admin",
            readTime: "10 min read",
        },
    ];

    return (
        <div className="min-h-screen bg-[#1a1832] flex flex-col">
            {/* Navigation */}
            <nav className="bg-[#1a1832] border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left Logo Section */}
                        <div className="flex items-center">
                            <img
                                src={Logo}
                                alt="Glitched Logo"
                                className="h-12"
                            />
                        </div>

                        {/* Center Navigation Links */}
                        <div className="flex space-x-4 items-center">
                            <button
                                onClick={() => setActiveSection("trending")}
                                className={`flex items-center px-3 py-2 text-sm font-medium ${
                                    activeSection === "trending"
                                        ? "text-white"
                                        : "text-gray-300 hover:text-white"
                                }`}
                            >
                                <TrendingUp className="h-4 w-4 mr-2" />
                                Trending
                            </button>
                            <span className="h-6 border-l border-gray-700"></span>
                            <button
                                onClick={() => setActiveSection("news")}
                                className={`flex items-center px-3 py-2 text-sm font-medium ${
                                    activeSection === "news"
                                        ? "text-white"
                                        : "text-gray-300 hover:text-white"
                                }`}
                            >
                                <Newspaper className="h-4 w-4 mr-2" />
                                News
                            </button>
                            <span className="h-6 border-l border-gray-700"></span>
                            <button
                                onClick={() => setActiveSection("tips")}
                                className={`flex items-center px-3 py-2 text-sm font-medium ${
                                    activeSection === "tips"
                                        ? "text-white"
                                        : "text-gray-300 hover:text-white"
                                }`}
                            >
                                <Lightbulb className="h-4 w-4 mr-2" />
                                Tips & Tricks
                            </button>
                            <span className="h-6 border-l border-gray-700"></span>
                            <button
                                onClick={() => setActiveSection("reviews")}
                                className={`flex items-center px-3 py-2 text-sm font-medium ${
                                    activeSection === "reviews"
                                        ? "text-white"
                                        : "text-gray-300 hover:text-white"
                                }`}
                            >
                                Reviews
                            </button>
                        </div>

                        {/* Right Icons */}
                        <div className="flex items-center">
                            <button className="p-1 text-gray-400 hover:text-white focus:outline-none">
                                <Search className="h-6 w-6" />
                            </button>
                            <button className="ml-4 p-1 text-gray-400 hover:text-white focus:outline-none">
                                <User className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Featured Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {/* Main Featured News */}
                        <div className="lg:col-span-2 relative rounded-lg overflow-hidden shadow-md">
                            <img
                                src={ImageMain}
                                alt="Valorant"
                                className="w-full h-[500px] object-cover"
                            />
                            {/* Overlapping Text Content */}
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent p-8">
                                <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                                    Nintendo Patent Details AI-Upscaling Tech
                                    Ahead Of Switch 2 Reveal
                                </h1>
                                <p className="text-gray-300 mb-6 drop-shadow-lg">
                                    13 Exciting Games Kicking Off The New Year
                                    In January | Exciting Games Kicking Off The
                                    New Year In January | Exciting Games Kicking
                                    Off The New Year In January
                                </p>
                                <div className="flex items-center text-gray-400 text-sm space-x-4">
                                    <span className="pr-4">By Borshon</span>{" "}
                                    {/* Added padding for spacing */}
                                    <span>•</span>
                                    <span>5 min read</span>
                                    <span>•</span>
                                    <div className="flex items-center space-x-2">
                                        {/* Arrow Up Icon */}
                                        <AiOutlineArrowUp className="w-4 h-4 text-white" />
                                        <span>69</span> {/* Upvotes */}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {/* Arrow Down Icon */}
                                        <AiOutlineArrowDown className="w-4 h-4 text-white" />
                                        <span>5</span> {/* Downvotes */}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {/* Comment Icon */}
                                        <BiCommentDetail className="w-4 h-4 text-white" />
                                        <span>10</span> {/* Comments */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* News Items on the Right */}
                        <div className="flex flex-col space-y-6">
                            {newsItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-[#242244] rounded-lg overflow-hidden"
                                >
                                    {/* News Item Image */}
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-32 object-cover"
                                        style={{
                                            objectFit: "cover",
                                            objectPosition: "center",
                                        }}
                                    />
                                    {/* News Item Content */}
                                    <div className="p-4">
                                        <h3 className="text-white font-semibold mb-2 text-sm">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-xs">
                                            By {item.author} • {item.readTime}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* First Divider */}
                    <SectionDivider />

                    {/* Reviews Section */}
                    <div className="mb-16">
                        <SwiperSlider title="Reviews" items={reviews} />
                    </div>

                    {/* Second Divider */}
                    <SectionDivider />

                    {/* Tips & Tricks Section */}
                    <div className="mb-16">
                        <SwiperSlider
                            title="Tips & Tricks"
                            items={tipsAndTricks}
                        />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-2 mb-6">
                            <img
                                src={Footer_Logo}
                                alt="Glitched Logo"
                                className="h-8"
                            />
                        </div>
                        <div className="flex space-x-6 mb-6">
                            <a
                                href="#"
                                className="flex items-center hover:text-gray-900 space-x-2"
                            >
                                <FaFacebookF className="h-5 w-5 text-[#1877F2]" />
                                <span className="text-gray-600">Facebook</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center hover:text-gray-900 space-x-2"
                            >
                                <FaTwitter className="h-5 w-5 text-[#1DA1F2]" />
                                <span className="text-gray-600">Twitter</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center hover:text-gray-900 space-x-2"
                            >
                                <FaYoutube className="h-5 w-5 text-[#FF0000]" />
                                <span className="text-gray-600">YouTube</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center hover:text-gray-900 space-x-2"
                            >
                                <FaDiscord className="h-5 w-5 text-[#5865F2]" />
                                <span className="text-gray-600">Discord</span>
                            </a>
                        </div>
                        <div className="flex space-x-6 text-sm text-gray-600">
                            <a href="#" className="hover:text-gray-900">
                                About
                            </a>
                            <a href="#" className="hover:text-gray-900">
                                Privacy
                            </a>
                            <a href="#" className="hover:text-gray-900">
                                Terms of Use
                            </a>
                            <a href="#" className="hover:text-gray-900">
                                Contact Us
                            </a>
                        </div>
                        <div className="mt-6 text-sm text-gray-500">
                            © 2024. All rights reserved by GLITCHED
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
