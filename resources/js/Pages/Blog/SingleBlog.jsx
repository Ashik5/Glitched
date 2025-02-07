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
import {useForm } from "@inertiajs/react";
import Image2 from "../../../assets/image_2.png";
import Image3 from "../../../assets/image_3.png";
import Image4 from "../../../assets/image_4.png";
import SwiperSlider from "@/Components/SwiperSlider/SwiperSlider";
import SectionDivider from "@/Components/SectionDivider/SectionDivider";
import Image1 from "../../../assets/image_1.png";
import GameDetailsCard from "../../Components/GameCard/Valorant";

const SingleBlog = (props) => {
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
    const { data, setData, post, processing, errors } = useForm({
        blog_id: props.blog.blog_id,
        comment: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("comments.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setData('comment', '');
            },
        });
    };
    console.log(props.blog);
    return (
        <Authenticated auth={props.auth}>
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Title */}
                    <h2 className="text-3xl font-semibold mb-6">
                        {props.blog.title}
                    </h2>

                    <div className="flex flex-col md:flex-row gap-6 items-stretch mb-8">
                        {/* Left Column (Image) */}
                        <div className="md:w-2/3">
                            <img
                                src={props.blog.image}
                                alt="Valorant Banner"
                                className="w-full h-full object-cover rounded-lg shadow-lg"
                            />
                        </div>
                        <GameDetailsCard />
                    </div>

                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: props.blog.content }}
                    />

                    {/* Author */}
                    <div className="mt-6 text-right text-sm text-gray-400">
                        — Author:{" "}
                        <span className="font-semibold">
                            {props.blog.author?.name}
                        </span>
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
                        <form
                            onSubmit={handleSubmit}
                            className="bg-[#1E1A4B] p-4 rounded-lg"
                        >
                            <textarea
                                value={data.comment}
                                onChange={(e) =>
                                    setData("comment", e.target.value)
                                }
                                placeholder="Write a comment..."
                                className="w-full bg-transparent border border-gray-600 rounded-lg p-2 outline-none"
                            ></textarea>
                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-3 bg-blue-600 px-4 py-2 rounded-lg"
                            >
                                {processing ? "posting..." : "Post Comment"}
                            </button>
                        </form>

                        {/* Existing Comments */}
                        <div className="mt-6 space-y-4">
                            {props.blog.comments.map((comment) => (
                                <div className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-gray-500 flex items-center justify-center rounded-full">
                                        <User
                                            size={24}
                                            className="text-gray-300"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">
                                            {comment.user.name}
                                        </p>
                                        <p className="text-gray-300">
                                            {comment.comment}
                                        </p>
                                    </div>
                                </div>
                            ))}
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
