// Importing required modules
const express = require('express');
const fs = require('fs');

// Creating express app
const app = express();

// Read JSON file
const jsonData = JSON.parse(fs.readFileSync('./data/sample.json'));

// Route to display JSON contents
app.get('/data', (req, res) => {
    // Sending JSON data as response
    res.json(jsonData);
});

// Listening to port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
