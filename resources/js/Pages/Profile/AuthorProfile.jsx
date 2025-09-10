import React from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    UserPlus,
    UserCheck,
    Calendar,
    MapPin,
    Globe,
    Twitter,
    Github,
    Linkedin,
    Mail,
    Users,
    BookOpen,
    Heart,
    MessageCircle,
    Share,
} from "lucide-react";
import { useForm, router } from "@inertiajs/react";
import SwiperSlider from "@/Components/SwiperSlider/SwiperSlider";
import SectionDivider from "@/Components/SectionDivider/SectionDivider";

const AuthorProfile = (props) => {
    const posts = props.user?.my_posts || [];

    const { data, setData, post, processing, errors } = useForm({
        author_id: props.user?.id,
    });
    const { isFollowing } = props;

    const handleFollow = () => {
        post(route("users.follow", props.user?.id), { preserveScroll: true });
    };

    const handleBlogClick = (blogId) => {
        router.visit(route("blog.show", blogId));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <Authenticated auth={props.auth}>
            <main className="min-h-screen bg-[#1E1A4B] text-white">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    {/* Clean Profile Header */}
                    <div className="bg-[#252538] rounded-xl p-10 mb-16">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
                            {/* Simple Profile Image */}
                            <div className="relative">
                                <img
                                    src={
                                        props.user?.image ||
                                        "/default-avatar.png"
                                    }
                                    alt={props.user?.name}
                                    className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
                                />
                            </div>

                            {/* Profile Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-4xl font-bold text-white mb-3">
                                    {props.user?.name}
                                </h1>
                                {props.user?.bio && (
                                    <p className="text-gray-400 mb-8 max-w-2xl leading-relaxed">
                                        {props.user?.bio}
                                    </p>
                                )}

                                {/* Clean Stats Grid */}
                                <div className="grid grid-cols-4 gap-8 mb-8 max-w-md mx-auto md:mx-0">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white mb-1">
                                            {props.postsCount || 0}
                                        </div>
                                        <div className="text-gray-400 text-sm uppercase tracking-wide">
                                            Posts
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white mb-1">
                                            {props.followerCount || 0}
                                        </div>
                                        <div className="text-gray-400 text-sm uppercase tracking-wide">
                                            Followers
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white mb-1">
                                            {props.followingCount || 0}
                                        </div>
                                        <div className="text-gray-400 text-sm uppercase tracking-wide">
                                            Following
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        {props.user?.email && (
                                            <a
                                                href={`mailto:${props.user?.email}`}
                                                className="w-12 h-12 bg-[#1E1A4B] rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors"
                                            >
                                                <Mail size={20} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Clean Follow Button */}
                            {props.auth.user.id !== props.user?.id && (
                                <button
                                    onClick={handleFollow}
                                    disabled={processing}
                                    className={`flex items-center gap-3 px-8 py-4 rounded-xl font-medium transition-colors ${
                                        isFollowing
                                            ? "bg-gray-600 hover:bg-gray-700 text-white"
                                            : "bg-blue-600 hover:bg-blue-700 text-white"
                                    }`}
                                >
                                    {isFollowing ? (
                                        <>
                                            <UserCheck size={20} />
                                            Following
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus size={20} />
                                            Follow
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* View All Posts Button */}
                    {props.user?.blogs_count > 3 && (
                        <div className="text-center mb-16">
                            <button
                                onClick={() =>
                                    router.visit(
                                        route("author.blogs", props.user?.id)
                                    )
                                }
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-colors"
                            >
                                View All Posts ({props.user?.blogs_count})
                            </button>
                        </div>
                    )}

                    <SectionDivider />

                    {/* My Posts */}
                    {props.myPosts && props.myPosts.length > 0 && (
                        <div className="mb-16">
                            <SwiperSlider
                                title="My Posts"
                                items={props.myPosts}
                            />
                        </div>
                    )}
                </div>

                <style jsx>{`
                    .line-clamp-2 {
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }

                    .line-clamp-3 {
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                `}</style>
            </main>
        </Authenticated>
    );
};

export default AuthorProfile;
