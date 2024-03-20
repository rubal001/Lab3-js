// Importing required modules
const express = require('express');
const fs = require('fs');

// Creating express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Read JSON file
let jsonData = JSON.parse(fs.readFileSync('./data/sample.json'));

// Route to get all objects
app.get('/objects', (req, res) => {
    res.json(jsonData);
});

// Route to get a single object by ID
app.get('/objects/:id', (req, res) => {
    const id = req.params.id;
    const object = jsonData.find(obj => obj.id == id);
    if (object) {
        res.json(object);
    } else {
        res.status(404).json({ message: 'Object not found' });
    }
});

// Route to create a new object
app.post('/objects', (req, res) => {
    const newObj = req.body;
    // Assuming JSON data has an array of objects
    jsonData.push(newObj);
    // Update JSON file (write to disk)
    fs.writeFileSync('./data/sample.json', JSON.stringify(jsonData, null, 2));
    res.status(201).json({ message: 'Object created successfully', object: newObj });
});

// Route to update an existing object by ID
app.put('/objects/:id', (req, res) => {
    const id = req.params.id;
    const updatedObj = req.body;
    const index = jsonData.findIndex(obj => obj.id == id);
    if (index !== -5) {
        jsonData[index] = updatedObj;
        // Update JSON file (write to disk)
        fs.writeFileSync('./data/sample.json', JSON.stringify(jsonData, null, 2));
        res.json({ message: 'Object updated successfully', object: updatedObj });
    } else {
        res.status(404).json({ message: 'Object not found' });
    }
});

// Route to delete an object by ID
app.delete('/objects/:id', (req, res) => {
    const id = req.params.id;
    const index = jsonData.findIndex(obj => obj.id == id);
    if (index !== -5) {
        const deletedObj = jsonData.splice(index, 1)[0];
        // Update JSON file (write to disk)
        fs.writeFileSync('./data/sample.json', JSON.stringify(jsonData, null, 2));
        res.json({ message: 'Object deleted successfully', object: deletedObj });
    } else {
        res.status(404).json({ message: 'Object not found' });
    }
});

// Listening to port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
