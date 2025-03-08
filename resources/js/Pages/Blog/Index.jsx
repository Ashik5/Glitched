import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, router } from "@inertiajs/react";

const Index = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setBlogs(props.blogs.data);
        setLoading(false);
    }, [props.blogs.data]);


    if (loading) {
        return <div>Loading Blogs...</div>;
    }

    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
   

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs.map((item) => (
                <li 
                   onClick={()=>{router.visit(route("blogs.single", { id: item.blog_id }));}} key={item.id} 
                    className="rounded-lg overflow-hidden shadow-lg cursor-pointer" // Add cursor-pointer here
                >
                    {/* Blog Image */}
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-56 object-cover"
                    />
                    {/* Blog Content */}
                    <div className="p-4 bg-[#242244]">
                        <h3 className="text-white font-semibold mb-2 text-sm">
                            {item.title}
                        </h3>
                        <p className="text-gray-400 text-xs">By {item.author.name}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
    <div className="pb-12"></div>
</AuthenticatedLayout>


    );
};

export default Index;
