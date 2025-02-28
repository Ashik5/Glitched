import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, router } from "@inertiajs/react";

const Index = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingBlog, setEditingBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        image: "",
        tags: "",
        category: "",
    });

    useEffect(() => {
        setBlogs(props.blogs.data);
        setLoading(false);
    }, [props.blogs.data]);

    const { delete: deleteBlog } = useForm();

    const handleDelete = (id) => {
        deleteBlog(route("blogs.delete", id));
    };

    const updateBlog = (id) => {
        fetch(route("blogs.update", { id: id }), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.json().then((error) => {
                        throw new Error(error.message);
                    });
                }
            })
            .then((data) => {
                setBlogs((prevBlogs) =>
                    prevBlogs.map((blog) =>
                        blog.blog_id === id ? data.blog : blog
                    )
                );
                setEditingBlog(null);
            })
            .catch((error) => {
                console.error("There was an error updating the blog!", error);
                alert("Error updating blog: " + error.message);
            });
    };

    const handelEdit = (blog) => {
        router.visit(route("blogs.edit", { id: blog.blog_id }));
    };

    const handleSingleBlog = (id) => {
        router.visit(route("blogs.single", { id: id }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
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

                        <button onClick={() => handleDelete(blog.blog_id)}>
                            Delete
                        </button>
                        <button onClick={() => handelEdit(blog)}>
                            Edit Blog1
                        </button>
                        <button onClick={() => handleSingleBlog(blog.blog_id)}>
                            View Blog
                        </button>
                    </li>
                ))}
            </ul>
            {editingBlog && (
                <div>
                    <h2>Edit Blog</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateBlog(editingBlog.blog_id);
                        }}
                    >
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Title"
                        />
                        <input
                            type="text"
                            name="desc"
                            value={formData.desc}
                            onChange={handleInputChange}
                            placeholder="Description"
                        />
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="Image URL"
                        />
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                            placeholder="Tags"
                        />
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            placeholder="Category"
                        />
                        <button type="submit">Save</button>
                    </form>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default Index;
