const API_URL = 'http://localhost:5000/api/blogs';

export const fetchBlogs = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('failed to fetch blogs');
    }
    return response.json();
};

export const addBlog = async (blog) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
    });
    if (!response.ok) {
        throw new Error('Failed to add blog');
    }
    return response.json();
};

export const  updateBlog = async () => {};

export const deleteBlog = async () => {};