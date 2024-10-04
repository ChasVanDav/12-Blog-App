const API_URL = 'http://localhost:5000/api/blogs';

export const fetchBlogs = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('failed to fetch blogs');
    }
    return response.json();
};

export const addBlog = async () => {};

export const  updateBlog = async () => {};

export const deleteBlog = async () => {};