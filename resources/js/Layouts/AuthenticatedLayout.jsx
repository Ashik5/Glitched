import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import { Lightbulb, Search } from "lucide-react";
import { FaFacebookF, FaTwitter, FaYoutube, FaDiscord } from "react-icons/fa";
import Footer_Logo from "../../assets/Footer_Logo.png";

export default function Authenticated({ auth, header, children }) {
    const [activeSection, setActiveSection] = useState("trending");

    return (
        <div className="min-h-screen text-white bg-gradient-to-br from-[#080715] to-[#2D277B]">


            <nav className="bg-[#1a1832] border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left Logo Section */}
                        <div className="flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                            </Link>
                        </div>

                        {/* Center Navigation Links */}
                        <div className="flex space-x-4 items-center">
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Dashboard
                            </NavLink>
                            <span className="h-6 border-l border-gray-700"></span>
                            <NavLink
                                href={route("blogs.index")}
                                active={route().current("blogs")}
                            >
                                Blogs
                            </NavLink>
                            <span className="h-6 border-l border-gray-700"></span>
                            <button
                                onClick={() => setActiveSection("tips")}
                                className={`flex items-center px-3 py-2 text-sm font-medium ${
                                    activeSection === "tips"
                                        ? "text-white"
                                        : "text-gray-300 hover:text-white"
                                }`}
                            >
                                <Lightbulb className="h-4 w-4 mr-2" />
                                Tips & Tricks
                            </button>
                            <span className="h-6 border-l border-gray-700"></span>
                            <button
                                onClick={() => setActiveSection("reviews")}
                                className={`flex items-center px-3 py-2 text-sm font-medium ${
                                    activeSection === "reviews"
                                        ? "text-white"
                                        : "text-gray-300 hover:text-white"
                                }`}
                            >
                                Reviews
                            </button>
                        </div>

                        {/* Right Icons */}
                        <div className="flex items-center">
                            <Link
                                href={route("search")}
                                className="p-1 text-gray-400 hover:text-white focus:outline-none"
                            >
                                <Search className="h-6 w-6" />
                            </Link>

                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <div className="ml-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {auth.user.name}

                                                    <svg
                                                        className="ml-2 -mr-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link
                                                href={route("profile.index")}
                                            >
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                            >
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
            <footer className="bg-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-2 mb-6">
                            <img
                                src={Footer_Logo}
                                alt="Glitched Logo"
                                className="h-8"
                            />
                        </div>
                        <div className="flex space-x-6 mb-6">
                            <a
                                href="#"
                                className="flex items-center hover:text-gray-900 space-x-2"
                            >
                                <FaFacebookF className="h-5 w-5 text-[#1877F2]" />
                                <span className="text-gray-600">Facebook</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center hover:text-gray-900 space-x-2"
                            >
                                <FaTwitter className="h-5 w-5 text-[#1DA1F2]" />
                                <span className="text-gray-600">Twitter</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center hover:text-gray-900 space-x-2"
                            >
                                <FaYoutube className="h-5 w-5 text-[#FF0000]" />
                                <span className="text-gray-600">YouTube</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center hover:text-gray-900 space-x-2"
                            >
                                <FaDiscord className="h-5 w-5 text-[#5865F2]" />
                                <span className="text-gray-600">Discord</span>
                            </a>
                        </div>
                        <div className="flex space-x-6 text-sm text-gray-600">
                            <a href="#" className="hover:text-gray-900">
                                About
                            </a>
                            <a href="#" className="hover:text-gray-900">
                                Privacy
                            </a>
                            <a href="#" className="hover:text-gray-900">
                                Terms of Use
                            </a>
                            <a href="#" className="hover:text-gray-900">
                                Contact Us
                            </a>
                        </div>
                        <div className="mt-6 text-sm text-gray-500">
                            © 2024. All rights reserved by GLITCHED
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
