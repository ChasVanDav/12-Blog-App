const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

// Load environment variables
dotenv.config();

// Create an instance of Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection setup
const pool = new Pool({
    connectionString: process.env.DATABASE_URI
});

// Routes
app.get('/', (req, res) => {
    res.json({ message: "Hello from Vanessa's server" });
});

app.get('/api/blogs', async (req, res) => {
    try {
        const allBlogs = await pool.query('SELECT * FROM blogs');
        res.json(allBlogs.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error on Vanessa's server");
    }
});

app.get('/api/blogs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
        if (blog.rows.length === 0) {
            return res.status(404).json({ msg: 'Blog not found' });
        }
        res.json(blog.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error on Vanessa's server");
    }
});

app.post('/api/blogs', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newBlog = await pool.query(
            'INSERT INTO blogs (title, content) VALUES ($1, $2) RETURNING *',
            [title, content]
        );
        res.json(newBlog.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error on Vanessa's server");
    }
});

app.put('/api/blogs/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updateBlog = await pool.query(
            'UPDATE blogs SET title = $1, content = $2 WHERE id = $3',
            [title, content, id]
        );
        if (updateBlog.rowCount === 0) {
            return res.status(404).json({ msg: 'Blog not found' });
        }
        res.json({ msg: 'Blog updated' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error on Vanessa's server");
    }
});

app.delete('/api/blogs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteBlog = await pool.query('DELETE FROM blogs WHERE id = $1', [id]);
        if (deleteBlog.rowCount === 0) {
            return res.status(404).json({ msg: 'Blog not found' });
        }
        res.json({ msg: 'Blog deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error on Vanessa's server");
    }
});

// Export the app (to use in server.js)
module.exports = app;