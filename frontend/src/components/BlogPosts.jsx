import React, { useState, useEffect } from 'react';
import { fetchBlogs, addBlog, updateBlog, deleteBlog } from './blogService';

const BlogPosts = () => {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState ({
        title: '',
        content: ''
    });
    const [editBlog, setEditBlog] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [detailsVisible, setDetailsVisible] = useState(null);

    useEffect(() => {
        //retrieve blogs 
        const getBlogs = async () => {
            const blogs = await fetchBlogs();
            setBlogs(blogs);
        };
        getBlogs();
    }, []);

    //handling put, post, delete, and detail visibility
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try{
            if(editBlog) {
                //update exisitng blog
                const updatedBlog = await updateBlog(editBlog.id, newBlog);
                setBlogs(blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog: blog)));
                setEditBlog(null);
            } else {
                //add new blog
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
        await deleteBlog(id);
        setBlogs(blogs.filter(blog => blog.id !== id));
    };

    const toggleDetails = (id) => {
        setDetailsVisible(detailsVisible === id ? null : id);
    };


return (
<div className="content">
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    <form onSubmit={handleSubmit}>
        <input 
        type="text"
        placeholder="Title"
        value={newBlog.title}
        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value})}
        />
        <input 
        type="text" 
        placeholder="Content"
        value={newBlog.content}
        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value})}
        />
        <button type="submit">{editBlog ? 'Update Blog' : 'Add Blog'}</button>

    </form>
    <h1>South Korea Blogs: Food, Fashion, etc</h1>
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