import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    ThumbsUp,
    ThumbsDown,
    MessageCircle,
    Share,
    Image as ImageIcon,
    User,
} from "lucide-react";
import Image2 from "../../../assets/image_2.png";
import Image3 from "../../../assets/image_3.png";
import Image4 from "../../../assets/image_4.png";
import SwiperSlider from "@/Components/SwiperSlider/SwiperSlider";
import SectionDivider from "@/Components/SectionDivider/SectionDivider";
import Image1 from "../../../assets/image_1.png";
import GameDetailsCard from "../../Components/GameCard/Valorant";

const SingleBlog = ({ auth }) => {
    const games = [
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
            title: "The Best Games of All Time",
            image: Image4,
            author: "Admin",
            readTime: "10 min read",
        },
    ];

    return (
        <Authenticated auth={auth}>
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Title */}
                    <h2 className="text-3xl font-semibold mb-6">
                        Nintendo Patent Details AI-Upscaling Tech Ahead Of
                        Switch 2 Reveal
                    </h2>

                    {/* Flex Container for Image + Right Column */}
                    <GameDetailsCard/>

                    {/* Article Content */}
                    <p className="mt-6 text-gray-300 leading-relaxed">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. It has been the industry standard
                        since the 1500s. An unknown printer scrambled a galley
                        of type to make a type specimen book...
                    </p>

                    <p className="mt-4 text-gray-300 leading-relaxed">
                        It was popularized in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker.
                    </p>

                    {/* Author */}
                    <div className="mt-6 text-right text-sm text-gray-400">
                        — Author: <span className="font-semibold">Borshon</span>
                    </div>

                    {/* Reaction Bar */}
                    <div className="flex justify-between items-center mt-8 text-gray-400">
                        <div className="flex space-x-4">
                            <button className="flex items-center space-x-1 hover:text-gray-200">
                                <ThumbsUp size={18} />
                                <span>69</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-gray-200">
                                <ThumbsDown size={18} />
                                <span>10</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-gray-200">
                                <MessageCircle size={18} />
                                <span>9</span>
                            </button>
                        </div>
                        <button className="flex items-center space-x-1 hover:text-gray-200">
                            <Share size={18} />
                            <span>Share</span>
                        </button>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-12">
                        <h3 className="text-xl font-semibold mb-4">Comments</h3>
                        <div className="bg-[#1E1A4B] p-4 rounded-lg">
                            <textarea
                                placeholder="Write a comment..."
                                className="w-full bg-transparent border border-gray-600 rounded-lg p-2 outline-none"
                            ></textarea>
                            <button className="mt-3 bg-blue-600 px-4 py-2 rounded-lg">
                                Post Comment
                            </button>
                        </div>

                        {/* Existing Comments */}
                        <div className="mt-6 space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-10 h-10 bg-gray-500 flex items-center justify-center rounded-full">
                                    <User size={24} className="text-gray-300" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">
                                        Antik Dhar
                                    </p>
                                    <p className="text-gray-300">
                                        Sheera Post... 🤩
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SectionDivider />

                    {/* Swiper Section */}
                    <div className="mb-16">
                        <SwiperSlider title="Reviews" items={games} />
                    </div>
                </div>
            </main>
        </Authenticated>
    );
};

export default SingleBlog;
