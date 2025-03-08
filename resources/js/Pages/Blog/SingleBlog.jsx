import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    ThumbsUp,
    ThumbsDown,
    MessageCircle,
    Share,
    Image as ImageIcon,
    User,
    Bookmark,
} from "lucide-react";
import { useForm, router } from "@inertiajs/react";
import Image2 from "../../../assets/image_2.png";
import Image3 from "../../../assets/image_3.png";
import Image4 from "../../../assets/image_4.png";
import SwiperSlider from "@/Components/SwiperSlider/SwiperSlider";
import SectionDivider from "@/Components/SectionDivider/SectionDivider";
import Image1 from "../../../assets/image_1.png";
import GameDetailsCard from "../../Components/GameCard/Valorant";

const SingleBlog = (props) => {
    const { data, setData, post, processing, errors } = useForm({
        blog_id: props.blog.blog_id,
        comment: "",
    });
    const { userLiked, userDisliked, userFavorited } = props;

    const handleLike = (blog_id) => {
        post(route("blog.like", blog_id), { preserveScroll: true });
    };
    const handleDisLike = (blog_id) => {
        post(route("blog.dislike", blog_id), { preserveScroll: true });
    };
    const handleFavourite = (blog_id) => {
        post(route("blog.favourite", blog_id), { preserveScroll: true });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("comments.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setData("comment", "");
            },
        });
    };
    const likesCount = props.blog?.likes?.length ?? 0;
    const dislikesCount = props.blog?.dislikes?.length ?? 0;
    const favouritesCount = props.blog?.favourites?.length ?? 0;
    const commentsCount = props.blog?.comments?.length ?? 0;
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
                                className="w-full h-[80vh] object-cover rounded-lg shadow-lg"
                            />
                        </div>
                        <GameDetailsCard game={props.blog.tag}/>
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
                            <button
                                onClick={() => handleLike(props.blog.blog_id)}
                                className="flex items-center space-x-1 hover:text-gray-200"
                            >
                                <ThumbsUp
                                    size={18}
                                    className={
                                        userLiked
                                            ? "icon-active"
                                            : "icon-inactive"
                                    }
                                />
                                <span>{likesCount}</span>
                            </button>
                            <button
                                onClick={() =>
                                    handleDisLike(props.blog.blog_id)
                                }
                                className="flex items-center space-x-1 hover:text-gray-200"
                            >
                                <ThumbsDown
                                    size={18}
                                    className={
                                        userDisliked
                                            ? "icon-active"
                                            : "icon-inactive"
                                    }
                                />
                                <span>{dislikesCount}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-gray-200">
                                <MessageCircle size={18} />
                                <span>{commentsCount}</span>
                            </button>
                            <button
                                onClick={() =>
                                    handleFavourite(props.blog.blog_id)
                                }
                                className="flex items-center space-x-1 hover:text-gray-200"
                            >
                                <Bookmark
                                    size={18}
                                    className={
                                        userFavorited
                                            ? "icon-active"
                                            : "icon-inactive"
                                    }
                                />
                                <span>{favouritesCount}</span>
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
                            {props.blog.comments.map((comment,index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="w-10 h-10 bg-gray-500 flex items-center justify-center rounded-full">
                                        <img
                                            src={comment.user.image}
                                            alt={comment.user.name}
                                            className="h-24 w-24 rounded-full"
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
                        <SwiperSlider title="Related Blogs" items={props.relatedBlogs} />
                    </div>
                </div>
            </main>
        </Authenticated>
    );
};

export default SingleBlog;
