const API_URL = 'http://localhost:5000/api/blogs';

//------CRUD OPERATIONS-----//
//GET
export const fetchBlogs = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('failed to fetch blogs');
    }
    return response.json();
};

//POST
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

//PUT
export const  updateBlog = async (id, blog) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(blog),
    });
    if (!response.ok) {
        throw new Error('Failed to update blog');
    }
    return response.json();
};

//DELETE
export const deleteBlog = async () => {};