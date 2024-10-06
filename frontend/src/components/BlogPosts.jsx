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

    // Fetch blogs from the server
    const getBlogs = async () => {
        try {
            const blogs = await fetchBlogs();
            setBlogs(blogs);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    // Fetch blogs on component mount
    useEffect(() => {
        getBlogs();
    }, []);

    // Handle form submission for adding or updating a blog
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
                await updateBlog(editBlog.id, newBlog);
                setEditBlog(null);  // Clear edit state
            } else {
                // Add new blog
                await addBlog(newBlog);
            }
            setNewBlog({
                id: '',
                title: '',
                content: ''
            });
            setDetailsVisible(null);

            // Fetch all blogs again to refresh the list
            await getBlogs();

        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    // Handle blog edit
    const handleEdit = (blog) => {
        setEditBlog(blog);
        setNewBlog({
            id: blog.id,
            title: blog.title,
            content: blog.content
        });
    };

    // Handle blog delete
    const handleDelete = async (id) => {
        try {
            await deleteBlog(id);
            // Fetch all blogs again after deletion
            await getBlogs();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    // Toggle details visibility
    const toggleDetails = (id) => {
        setDetailsVisible(detailsVisible === id ? null : id);
    };

    return (
        <div className="content">
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
    <input 
        type="text"
        placeholder="Title of blog"
        value={newBlog.title}
        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
    />
    <textarea 
        placeholder="Start typing blog content"
        value={newBlog.content}
        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
        rows="5" // Set the number of visible rows
        style={{ resize: 'vertical' }} // Allow vertical resizing
    />
    <button type="submit">{editBlog ? 'Update Blog' : 'Add Blog'}</button>
</form>
            <h2>My SoKo Life</h2>
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
        </div>
    );
};

export default BlogPosts;
