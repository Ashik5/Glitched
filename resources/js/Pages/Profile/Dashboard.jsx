import React from "react";
import { CheckCircle, XCircle, Menu, Home, LogOut } from "lucide-react";

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-[#1E1A4B] p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                    <nav className="space-y-4">
                        <a
                            href="#"
                            className="flex items-center gap-2 hover:text-gray-300"
                        >
                            <Home size={20} /> Dashboard
                        </a>
                    </nav>
                </div>
                <button className="flex items-center gap-2 text-red-400 hover:text-red-300">
                    <LogOut size={20} /> Logout
                </button>
            </aside>
        </div>
    );
};

export default Dashboard;
