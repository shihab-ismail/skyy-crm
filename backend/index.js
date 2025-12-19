const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); 
const Contact = require('./models/Contact'); 

const app = express();
app.use(express.json());

// 1. ADD THIS: This tells Express to serve index.html from the public folder
app.use(express.static(path.join(__dirname, 'public')));

const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongodb:27017/skyy_db';

mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ Skyy-DB Connected"))
  .catch(err => console.error("❌ Connection Failed", err));

// --- API ROUTES ---

// Create a New Contact
app.post('/api/contacts', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Contacts
app.get('/api/contacts', async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});


// NOTE: I removed the app.get('/') text block that was here before!

app.listen(3000, () => console.log('🚀 Skyy-CRM Server flying on port 3000'));