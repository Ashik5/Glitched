import { CirclePlus, Home, LogOut } from "lucide-react";
import Dropdown from "@/Components/Dropdown";
import ApplicationLogo from "@/Components/ApplicationLogo";

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center">
                        <a href={route("welcome")}>
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                        </a>
                    </div>
                    <h2 className="text-xl font-semibold mb-6 mt-6">User Panel</h2>
                    <nav className="space-y-4">
                        <a
                            href={route("profile.index")}
                            className="flex items-center gap-2 hover:text-gray-300"
                        >
                            <Home size={20} /> Dashboard
                        </a>
                        <a
                            href={route("blogs.create")}
                            className="flex items-center gap-2 hover:text-gray-300"
                        >
                            <CirclePlus size={20} /> Create a Blog
                        </a>
                    </nav>
                </div>
                <Dropdown.Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    className="flex items-center gap-2 text-red-400 hover:text-red-300"
                >
                    <LogOut size={20} /> Logout
                </Dropdown.Link>
            </aside>
        </div>
    );
};

export default Dashboard;
