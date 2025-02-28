import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import Dashboard from "../Admin/dashboard";

const Users = () => {
    // Fake user data (Replace with API calls)
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", approved: false },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            approved: true,
        },
        {
            id: 3,
            name: "Alice Brown",
            email: "alice@example.com",
            approved: false,
        },
    ]);

    // Approve User
    const approveUser = (id) => {
        setUsers(
            users.map((user) =>
                user.id === id ? { ...user, approved: true } : user
            )
        );
    };

    // Delete User
    const deleteUser = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            <Dashboard />
            <div className="flex-1 p-6 text-white">
                <h2 className="text-2xl font-bold mb-4">User Management</h2>

                {/* Pending Users */}
                <h3 className="text-xl font-semibold mb-2">Pending Users</h3>
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
                                            onClick={() => approveUser(user.id)}
                                            className="flex items-center bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                        >
                                            <CheckCircle
                                                size={16}
                                                className="mr-1"
                                            />{" "}
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="flex items-center bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                        >
                                            <Trash2
                                                size={16}
                                                className="mr-1"
                                            />{" "}
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                    )}
                </div>

                {/* Approved Users */}
                <h3 className="text-xl font-semibold mt-6 mb-2">
                    Approved Users
                </h3>
                <div className="bg-gray-800 p-4 rounded-md">
                    {users.filter((user) => user.approved).length === 0 ? (
                        <p className="text-gray-400">No approved users.</p>
                    ) : (
                        users
                            .filter((user) => user.approved)
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
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="flex items-center bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                    >
                                        <Trash2 size={16} className="mr-1" />{" "}
                                        Delete
                                    </button>
                                </div>
                            ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Users;
