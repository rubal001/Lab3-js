// Importing required modules
const express = require('express');

// Creating express app
const app = express();

// Route to display group names using HTML elements
app.get('/', (req, res) => {
    // Sending group names as HTML response
    res.send('<h1>Group 16</h1><ul><li>Rubalpreet Kaur</li><li>Arshdeep Kaur</li></ul>');
});

// Listening to port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
