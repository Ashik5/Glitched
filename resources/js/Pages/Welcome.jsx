import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import SwiperSlider from "../Components/SwiperSlider/SwiperSlider";
import SectionDivider from "../Components/SectionDivider/SectionDivider";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";

function App(props) {
    const { topTipsBlogs, topNewsBlogs, topBlogs, featuredBlog } = props;
    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            {/* Main Content */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Featured Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        {/* Main Featured News */}
                        <div
                            onClick={() => {
                                router.visit(
                                    route("blogs.single", {
                                        id: featuredBlog?.blog_id,
                                    })
                                );
                            }}
                            className="lg:col-span-2 relative rounded-lg overflow-hidden shadow-md cursor-pointer"
                        >
                            <img
                                src={featuredBlog?.image}
                                alt="Valorant"
                                className="w-full h-[500px] object-cover"
                            />
                            {/* Overlapping Text Content */}
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent p-8">
                                <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                                    {featuredBlog?.title}
                                </h1>
                                <div className="flex items-center text-gray-400 text-sm space-x-4">
                                    <span className="pr-4">
                                        By {featuredBlog?.author.name}
                                    </span>{" "}
                                    {/* Added padding for spacing */}
                                    <span>•</span>
                                    <span>5 min read</span>
                                    <span>•</span>
                                    <div className="flex items-center space-x-2">
                                        {/* Arrow Up Icon */}
                                        <AiOutlineArrowUp className="w-4 h-4 text-white" />
                                        <span>{featuredBlog?.likes.length}</span>{" "}
                                        {/* Upvotes */}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {/* Arrow Down Icon */}
                                        <AiOutlineArrowDown className="w-4 h-4 text-white" />
                                        <span>
                                            {featuredBlog?.dislikes.length}
                                        </span>{" "}
                                        {/* Downvotes */}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {/* Comment Icon */}
                                        <BiCommentDetail className="w-4 h-4 text-white" />
                                        <span>
                                            {featuredBlog?.comments.length}
                                        </span>{" "}
                                        {/* Comments */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* News Items on the Right */}
                        <div className="flex flex-col space-y-6">
                            {topBlogs?.map((item, index) => (
                                <div
                                    onClick={() => {
                                        router.visit(
                                            route("blogs.single", {
                                                id: item.blog_id,
                                            })
                                        );
                                    }}
                                    key={index}
                                    className="bg-[#242244] rounded-lg overflow-hidden cursor-pointer"
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
                                            By {item.author.name}
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
                        <SwiperSlider title="News" items={topNewsBlogs} />
                    </div>

                    {/* Second Divider */}
                    <SectionDivider />

                    {/* Tips & Tricks Section */}
                    <div className="mb-16">
                        <SwiperSlider
                            title="Tips & Tricks"
                            items={topTipsBlogs}
                        />
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}

export default App;
