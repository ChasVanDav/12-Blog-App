const app = require('./app'); // Import the app
const dotenv = require('dotenv'); // Load environment variables

dotenv.config(); // Ensure environment variables are available

const PORT = process.env.PORT || 3000;

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Vanessa's server is running on port ${PORT}`);
});

// Export the server for testing purposes
module.exports = server;