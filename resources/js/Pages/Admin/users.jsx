import React, { useState, useEffect } from "react";
import { CheckCircle, Trash2 } from "lucide-react";
import Dashboard from "../Admin/dashboard";
import axios from "axios"; 

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
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

    const toggleBan = async (id, banned) => {
        try {
            const response = await axios.post(`/api/users/${id}/toggle-ban`);

            if (response.status === 200) {
                setUsers(
                    users.map((user) =>
                        user.id === id ? { ...user, banned: !banned } : user
                    )
                );
            }
        } catch (error) {
            console.error(`Error ${banned ? "unbanning" : "banning"} user:`, error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <Dashboard />
            <div className="flex-1 p-6 text-white">
                <h2 className="text-2xl font-bold mb-4">User Management</h2>

                <h3 className="text-xl font-semibold mb-2">Users</h3>
                <div className="bg-gray-800 p-4 rounded-md">
                    {users.length === 0 ? (
                        <p className="text-gray-400">No users found.</p>
                    ) : (
                        users.map((user) => (
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
                                    {user.banned ? (
                                        <button
                                            onClick={() => toggleBan(user.id, true)}
                                            className="flex items-center bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                        >
                                            <CheckCircle size={16} className="mr-1" /> Unban
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => toggleBan(user.id, false)}
                                            className="flex items-center bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                        >
                                            <Trash2 size={16} className="mr-1" /> Ban
                                        </button>
                                    )}
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
