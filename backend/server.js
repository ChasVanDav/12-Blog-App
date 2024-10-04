const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

//-----middleware---//
//enables controlled access to APIs via http requests 
app.use(cors());
//parses JSON data(from API responses) and returns it as a Javascript object on req.body
app.use(express.json());

//----routes----//
//root route that sends a message to the backend
app.get('/', (req, res) => {
    res.json({message: "hello from Vanessa's server"});
});

//-----start the server----//
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Vanessa's server is running on port ${PORT}`);
});