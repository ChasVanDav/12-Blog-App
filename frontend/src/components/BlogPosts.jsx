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
        setBlogs(blogs.filteer(blog => blog.id !== id));
    };

    const toggleDetails = (id) => {
        setDetailsVisible(detailsVisible === id ? null : id);
    };


return (
<div>
    <h1>Blogs</h1>
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
    </form>
</div>

);

};

export default BlogPosts;