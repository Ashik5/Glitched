import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const News = ({ blogs }) => {
    return (
        <AuthenticatedLayout>
            <Head title="Reviews" />
            <div className="max-w-6xl mx-auto p-6 text-white">
                <h1 className="text-3xl font-bold mb-6">Reviews</h1>
                {blogs.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.data.map((blog) => (
                            <div key={blog.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold">{blog.title}</h2>
                                    <p className="text-gray-400 text-sm">{blog.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No reviews available.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default News;
