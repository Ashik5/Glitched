import React, { useEffect, useState } from "react";
import { Users, FileText, UserCheck, Clock } from "lucide-react";
import Dashboard from "../Admin/dashboard"; // Import your responsive sidebar
import Card from "../../Components/Card";
import CardContent from "../../Components/CardContent";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../Components/Table";

const AdminDashboard = () => {
    const topUsers = [
        { name: "Alice", posts: 120 },
        { name: "Bob", posts: 110 },
        { name: "Charlie", posts: 90 },
        { name: "David", posts: 85 },
        { name: "Emma", posts: 75 },
    ];

    const topPosts = [
        { title: "AI Revolution", likes: 320 },
        { title: "React Performance Tips", likes: 290 },
        { title: "Cloud Computing Explained", likes: 250 },
        { title: "Cybersecurity in 2025", likes: 220 },
        { title: "The Future of Web3", likes: 200 },
    ];

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPosts: 0,
        pendingUsers: 0,
        pendingPosts: 0,
    });
    console.log("Top Users:", topUsers);
console.log("Top Posts:", topPosts);

    return (
        <div className="flex bg-gray-900 text-white min-h-screen">
            {/* Sidebar */}
            <Dashboard />

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Users */}
                    <div className="bg-[#1E1A4B] p-6 rounded-lg shadow-md flex items-center gap-4">
                        <Users size={40} className="text-blue-400" />
                        <div>
                            <h3 className="text-lg font-medium">Total Users</h3>
                            <p className="text-2xl font-bold">{stats.totalUsers}</p>
                        </div>
                    </div>

                    {/* Total Posts */}
                    <div className="bg-[#1E1A4B] p-6 rounded-lg shadow-md flex items-center gap-4">
                        <FileText size={40} className="text-green-400" />
                        <div>
                            <h3 className="text-lg font-medium">Total Posts</h3>
                            <p className="text-2xl font-bold">{stats.totalPosts}</p>
                        </div>
                    </div>

                    {/* Pending Users */}
                    <div className="bg-[#1E1A4B] p-6 rounded-lg shadow-md flex items-center gap-4">
                        <UserCheck size={40} className="text-yellow-400" />
                        <div>
                            <h3 className="text-lg font-medium">Pending Users</h3>
                            <p className="text-2xl font-bold">{stats.pendingUsers}</p>
                        </div>
                    </div>

                    {/* Pending Posts */}
                    <div className="bg-[#1E1A4B] p-6 rounded-lg shadow-md flex items-center gap-4">
                        <Clock size={40} className="text-red-400" />
                        <div>
                            <h3 className="text-lg font-medium">Pending Posts</h3>
                            <p className="text-2xl font-bold">{stats.pendingPosts}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    
                    {/* Top Users */}
                    <Card>
                        <CardContent>
                            <h2 className="text-xl font-semibold mb-4">🏆 Top Active Users</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Rank</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Posts</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topUsers.map((user, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.posts}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Top Posts */}
                    <Card>
                        <CardContent>
                            <h2 className="text-xl font-semibold mb-4">🔥 Most Liked Posts</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Rank</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Likes</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {topPosts.map((post, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{post.title}</TableCell>
                                            <TableCell>{post.likes}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
