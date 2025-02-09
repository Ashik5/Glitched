import { useForm } from "@inertiajs/react";
import TinyEditor from "@/Components/Blog/TinyEditor";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function EditBlog({ auth, errors, blog }) {
    const { data, setData, put, processing } = useForm({
        title: blog.title || "",
        content: blog.content || "",
        image: null,
        author: blog.author || "",
        tag: blog.tag || "",
        category: blog.category || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("blogs.update", blog.id));
    };

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Edit Blog
                </h2>
            }
        >
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                    />
                    {errors.title && (
                        <div className="text-red-500 text-xs">
                            {errors.title}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Description
                    </label>
                    <TinyEditor
                        value={data.content}
                        onChange={(content) => setData("content", content)}
                    />
                    {errors.content && (
                        <div className="text-red-500 text-xs">
                            {errors.content}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Game
                    </label>
                    <select
                        value={data.tag}
                        onChange={(e) => setData("tag", e.target.value)}
                        className="shadow border rounded w-full py-2 px-3"
                    >
                        <option value="">Select Game</option>
                        <option value="valorant">Valorant</option>
                        <option value="csgo">CSGO</option>
                    </select>
                    {errors.tag && (
                        <div className="text-red-500 text-xs">{errors.tag}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Category
                    </label>
                    <select
                        value={data.category}
                        onChange={(e) => setData("category", e.target.value)}
                        className="shadow border rounded w-full py-2 px-3"
                    >
                        <option value="">Select Category</option>
                        <option value="tips">Tips & Tricks</option>
                        <option value="news">News</option>
                    </select>
                    {errors.category && (
                        <div className="text-red-500 text-xs">
                            {errors.category}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Featured Image (Optional)
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setData("image", e.target.files[0])}
                        className="shadow appearance-none border rounded w-full py-2 px-3"
                    />
                    {errors.image && (
                        <div className="text-red-500 text-xs">
                            {errors.image}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {processing ? "Updating..." : "Update Blog"}
                </button>
            </form>
        </AuthenticatedLayout>
    );
}
