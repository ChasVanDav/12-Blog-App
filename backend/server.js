const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const app = express();

//-----middleware---//
//enables controlled access to APIs via http requests 
app.use(cors());
//parses JSON data(from API responses) and returns it as a Javascript object on req.body
app.use(express.json());

//----SQL Database Connection----//
const pool = new Pool({
    connectionString: process.env.DATABASE_URI
});

//----routes----//
//root route that sends a message to the backend
app.get('/', (req, res) => {
    res.json({message: "Hello from Vanessa's server"});
});
//GET route to database querying all blog information
app.get('/api/blogs', async (req,res) => {
    try {
        const allBlogs = await pool.query('SELECT * FROM blogs');
        res.json(allBlogs.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Error on Vanessa's server");
    }
});
//GET route to db querying blog by id
app.get('/api/blogs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
        if (blog.rows.length === 0) {
            return res.status(404).json({msg: 'Blog not found'})
        }
        res.json(blog.rows[0]);
    }   catch (err) {
        console.error(err.message);
        res.status(500).send("Error on Vanessa's server")
    }
})
//POST route adding new blog post to db
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
//PUT route updating an exisiting blog by id
app.put('/api/blogs/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updateBlog = await pool.query(
            'UPDATE blogs SET title = $1, content = $2 WHERE id = $3',
            [title, content]
        );
        if (updateBlog.rowCount === 0) {
            return res.status(404).json({ msg: 'Blog not found'});
        }
        res.json({ msg: 'Blog updated' });
    }   catch (err) {
        console.erroor(err.message);
        res.status(500).send("Error on Vanessa's server")

    }
})
//DELETE route removing an existing blog by id
app.delete('/api/blogs/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteBlog = await pool.query('DELETE FROM blogs WHERE id =$1', [id]);
        if (deleteBlog.rowCount === 0) {
            return res.status(404).json({ msg: 'Blog not found'});
        }
        res.json({ msg: 'Blog deleted' });
    }   catch (err) {
        console.error(err.message);
        res.status(500).send("Error on Vanessa's server")
    }
});

//-----start the server----//
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Vanessa's server is running on port ${PORT}`);
});