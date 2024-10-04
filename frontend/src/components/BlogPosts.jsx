import React, { useState, useEffect } from 'react';
import { fetchBlogs, addBlog, updateBlog, deleteBlog } from './blogService';

const BlogPosts = () => {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({
        title: '',
        content: ''
    });
    const [editBlog, setEditBlog] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [detailsVisible, setDetailsVisible] = useState(null);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const blogs = await fetchBlogs();
                setBlogs(blogs);
            } catch (error) {
                setErrorMessage(error.message);
            }
        };
        getBlogs();
    }, []);

    // Handling PUT, POST, DELETE, and detail visibility
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Validate blog content
        if (!newBlog.title || !newBlog.content) {
            setErrorMessage('Title and content are required');
            return;
        }

        try {
            if (editBlog) {
                // Update existing blog
                const updatedBlog = await updateBlog(editBlog.id, newBlog);
                setBlogs(blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog)));
                setEditBlog(null);
            } else {
                // Add new blog
                const addedBlog = await addBlog(newBlog);
                setBlogs([...blogs, addedBlog]);
            }
            setNewBlog({
                title: '',
                content: ''
            });
            setDetailsVisible(null);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleEdit = (blog) => {
        setEditBlog(blog);
        setNewBlog({
            title: blog.title,
            content: blog.content
        });
    };

    const handleDelete = async (id) => {
        try {
            await deleteBlog(id);
            setBlogs(blogs.filter(blog => blog.id !== id));
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const toggleDetails = (id) => {
        setDetailsVisible(detailsVisible === id ? null : id);
    };

    return (
        <div className="content">
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            
            <h2>South Korea Blogs: Food, Fashion, etc</h2>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.id}>
                        <span>{blog.title}</span>
                        <button onClick={() => toggleDetails(blog.id)}>
                            {detailsVisible === blog.id ? 'Hide Details' : 'Details'}
                        </button>
                        
                        {detailsVisible === blog.id && (
                            <div>
                                <p>{blog.content}</p>
                                <button onClick={() => handleEdit(blog)}>Edit</button>
                                <button onClick={() => handleDelete(blog.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Title"
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                />
                <input 
                    type="text" 
                    placeholder="Content"
                    value={newBlog.content}
                    onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                />
                <button type="submit">{editBlog ? 'Update Blog' : 'Add Blog'}</button>
            </form>
        </div>
    );
};

export default BlogPosts;
