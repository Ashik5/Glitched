import React from "react";
import { CheckCircle, XCircle, Menu, Home, Users, LogOut } from "lucide-react";
import Dashboard from "../Admin/dashboard";
import Image2 from "../../../assets/image_2.png";
import Image3 from "../../../assets/image_3.png";
import Image4 from "../../../assets/image_4.png";
const posts = [
    {
        id: 1,
        title: "Red Dead Redemption 2",
        image: Image2,
        category: "Action",
        status: "Pending",
    },
    {
        id: 2,
        title: "Fortnite",
        image: Image3,
        category: "Battle Royale",
        status: "Pending",
    },
    {
        id: 3,
        title: "Counter Strike 2",
        image: Image4,
        category: "FPS",
        status: "Pending",
    },
];

const AdminPanel = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <Dashboard />
            

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-6">Verify Posts</h1>
                
                {/* Post Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-[#1E1A4B] p-4 rounded-lg shadow-lg">
                            <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded-lg" />
                            <h3 className="text-xl font-semibold mt-3">{post.title}</h3>
                            <p className="text-sm text-gray-300">Category: {post.category}</p>
                            <p className="text-sm text-yellow-400">Status: {post.status}</p>
                            <div className="flex gap-4 mt-4">
                                <button className="flex-1 bg-green-600 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700">
                                    <CheckCircle size={18} /> Approve
                                </button>
                                <button className="flex-1 bg-red-600 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-700">
                                    <XCircle size={18} /> Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
