import {Menu, Home, Users, LogOut } from "lucide-react";
import Dropdown from "@/Components/Dropdown";

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-[#1E1A4B] text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                    <nav className="space-y-4">
                        <a
                             href={route("blog.admin")}
                            className="flex items-center gap-2 hover:text-gray-300"
                        >
                            <Home size={20} /> Dashboard
                        </a>
                        <a
                            href={route("blog.admin.users")}
                            className="flex items-center gap-2 hover:text-gray-300"
                        >
                            <Users size={20} /> Users
                        </a>
                        <a
                            href={route("blog.admin.posts")}
                            className="flex items-center gap-2 hover:text-gray-300"
                        >
                            <Menu size={20} /> Posts
                        </a>
                    </nav>
                </div>
                <Dropdown.Link href={route("logout")} method="post" as="button" className="flex items-center gap-2 text-red-400 hover:text-red-300">
                <LogOut size={20} /> Logout
                </Dropdown.Link>
            </aside>
        </div>
    );
};

export default Dashboard;
