import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import Dashboard from "../Admin/dashboard";

const Users = () => {
    // Fake user data (Replace with API calls)
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the API
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleBan = async (id) => {
        try {
            const response = await fetch(`/api/users/${id}/ban`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                setUsers(
                    users.map((user) =>
                        user.id === id ? { ...user, banned: true } : user
                    )
                );
            } else {
                console.error("Error banning user:", response.statusText);
            }
        } catch (error) {
            console.error("Error banning user:", error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <Dashboard />
            <div className="flex-1 p-6 text-white">
                <h2 className="text-2xl font-bold mb-4">User Management</h2>

                {/* Pending Users */}
                <h3 className="text-xl font-semibold mb-2">Users</h3>
                <div className="bg-gray-800 p-4 rounded-md">
                    {users.filter((user) => !user.approved).length === 0 ? (
                        <p className="text-gray-400">No pending users.</p>
                    ) : (
                        users
                            .filter((user) => !user.approved)
                            .map((user) => (
                                <div
                                    key={user.id}
                                    className="flex justify-between items-center bg-gray-700 p-3 rounded-md mb-2"
                                >
                                    <div>
                                        <p className="text-lg">{user.name}</p>
                                        <p className="text-gray-400 text-sm">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleBan(user.id)}
                                            className="flex items-center bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                        >
                                            <Trash2
                                                size={16}
                                                className="mr-1"
                                            />{" "}
                                            Ban
                                        </button>
                                    </div>
                                </div>
                            ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Users;
