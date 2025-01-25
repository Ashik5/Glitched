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
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

function App(props) {
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
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
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
        </AuthenticatedLayout>
    );
}

export default App;
