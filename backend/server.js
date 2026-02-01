const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/merndb';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log("MongoDB connection error:", err));



const User = require('./models/User');

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.post('/api/users', async (req, res) => {
    console.log("creating user..");

    try {
        const { username, email, dob } = req.body;
        if (!username || !email || !dob) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.create({ username, email, dob });
        res.status(201).json(user);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/users', async (req, res) => {
    console.log("retrieving users..")
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));