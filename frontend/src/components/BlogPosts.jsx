import React, { useState, useEffect } from 'react';
import { fetchBlogs, addBlog, updateBlog, deleteBlog } from './blogService';

const BlogPosts = () => {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState ({
        title: '',
        content: ''
    });

return (
<div>
    <h1>Blogs</h1>
</div>

);

};

export default BlogPosts;