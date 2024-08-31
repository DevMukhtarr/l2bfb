const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv").config()

// Import Models
const User = require('./models/user');
const Scholarship = require('./models/scholarship');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log("connection successful")
}).catch(() =>{
    console.log("error connection")
});

app.get("/", (req, res) =>{
    res.send("welcome to scholarship portal")
}) 

// Register endpoint
app.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, role, password } = req.body;
        const user = new User({ firstname, lastname, email, role, password });
        await user.save();
        res.status(201).send({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).send({ message: 'Error registering user', error });
    }
});

// Signin endpoint
app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            res.status(200).send({ message: 'Signin successful', user });
        } else {
            res.status(401).send({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).send({ message: 'Error signing in', error });
    }
});

// Post scholarship endpoint
app.post('/post_scholarship', async (req, res) => {
    try {
        const { scholarship_name, scholarship_details } = req.body;
        const scholarship = new Scholarship({ scholarship_name, scholarship_details });
        await scholarship.save();
        res.status(201).send({ message: 'Scholarship posted successfully', scholarship });
    } catch (error) {
        res.status(400).send({ message: 'Error posting scholarship', error });
    }
});

// View all scholarships endpoint
app.get('/view_scholarships', async (req, res) => {
    try {
        const scholarships = await Scholarship.find();
        res.status(200).send({ scholarships });
    } catch (error) {
        res.status(400).send({ message: 'Error fetching scholarships', error });
    }
});

// View specific scholarship by id
app.get('/view_scholarship/:id', async (req, res) => {
    try {
        const scholarship = await Scholarship.findById(req.params.id);
        if (scholarship) {
            res.status(200).send({ scholarship });
        } else {
            res.status(404).send({ message: 'Scholarship not found' });
        }
    } catch (error) {
        res.status(400).send({ message: 'Error fetching scholarship', error });
    }
});

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});