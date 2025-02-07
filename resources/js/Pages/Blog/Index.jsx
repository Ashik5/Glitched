import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Index = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setBlogs(props.blogs.data);
        setLoading(false);
    }, []);

    const deleteBlog = (id) => {
        console.log("Blog ID to delete:", id); // Log the ID

        if (confirm("Are you sure you want to delete this blog?")) {
            fetch(route("blogs.delete"), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: id }), // Ensure the ID is included here
            })
                .then((response) => {
                    if (response.ok) {
                        setBlogs((prevBlogs) =>
                            prevBlogs.filter((blog) => blog.blog_id !== id)
                        );
                    } else {
                        return response.json().then((error) => {
                            throw new Error(error.message);
                        });
                    }
                })
                .catch((error) => {
                    console.error(
                        "There was an error deleting the blog!",
                        error
                    );
                    alert("Error deleting blog: " + error.message);
                });
        }
    };

    if (loading) {
        return <div>Loading Blogs...</div>;
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Blogs
                </h2>
            }
        >
            <Head title="Blogs" />
            <h1>Blogs</h1>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.blog_id}>
                        <h2>{blog.title}</h2>
                        <p>{blog.desc}</p>

                        <div className="prose max-w-none rounded-lg p-8 shadow-sm">
                            <div
                                dangerouslySetInnerHTML={{ __html: blog.desc }}
                                className="blog-content"
                            />
                        </div>

                        <button onClick={() => deleteBlog(blog.blog_id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </AuthenticatedLayout>
    );
};

export default Index;
