import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulated fetch for blog data
        setTimeout(() => {
            setBlogs([
                { id: 1, title: 'First Blog', description: 'This is the first blog description.' },
                { id: 2, title: 'Second Blog', description: 'This is the second blog description.' },
                { id: 3, title: 'Third Blog', description: 'This is the third blog description.' }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return <div>Loading Blogs...</div>;
    }
    console.log(props.blogs);
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Blogs</h2>}
        >
            <Head title="Blogs" />
            <h1>Blogs</h1>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        <h2>{blog.title}</h2>
                        <p>{blog.description}</p>
                    </li>
                ))}
            </ul>
        </AuthenticatedLayout>
    );
};

export default Index;