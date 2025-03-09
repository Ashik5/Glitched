import { useForm } from "@inertiajs/react";
import TinyEditor from "@/Components/Blog/TinyEditor";
import Dashboard from "../Profile/Dashboard";
import { useEffect, useState } from "react";

export default function Create() {
    const [games, setGames] = useState([]);
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        content: "",
        image: null,
        author: "",
        tag: "",
        category: "",
        likes: 0,
        dislikes: 0,
        comments: [],
    });

    useEffect(() => {
        fetch("/api/gameAPI.json")
            .then((response) => response.json())
            .then((data) => {
                setGames(data.games);
            });
    }, []);

    console.log(games);
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("blogs.store"));
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
            {/* Sidebar - Using Dashboard Component with fixed position */}
            <div className="fixed h-screen">
                <Dashboard />
            </div>

            {/* Main content area with scrolling */}
            <div className="flex-1 ml-64 overflow-y-auto h-screen">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
                    <div className="mb-4">
                        <label className="block text-white-700 text-sm font-bold mb-2">
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
                        <label className="block text-white-700 text-sm font-bold mb-2">
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
                        <label className="block text-white-700 text-sm font-bold mb-2">
                            Game
                        </label>
                        <select
                            value={data.tag}
                            onChange={(e) => setData("tag", e.target.value)}
                            className="shadow border rounded w-full py-2 px-3 text-black"
                        >
                            <option value="">Select Game</option>
                            {games.length > 0 ? (
                                games.map((game, index) => (
                                    <option
                                        key={index}
                                        value={game.name.toLowerCase()}
                                    >
                                        {game.name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No games available</option> // Show when no games
                            )}
                        </select>
                        {errors.tag && (
                            <div className="text-red-500 text-xs">
                                {errors.tag}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-white-700 text-sm font-bold mb-2">
                            Category
                        </label>
                        <select
                            value={data.category}
                            onChange={(e) =>
                                setData("category", e.target.value)
                            }
                            className="shadow border rounded w-full py-2 px-3 text-black"
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
                        <label className="block text-white-700 text-sm font-bold mb-2">
                            Featured Image
                        </label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setData("image", e.target.files[0])
                            }
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                    >
                        {processing ? "Creating..." : "Create Blog"}
                    </button>
                </form>
            </div>
        </div>
    );
}
