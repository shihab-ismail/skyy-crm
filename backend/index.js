const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); 
const bcrypt = require('bcryptjs'); // Added for the setup route
const Contact = require('./models/Contact'); 
const User = require('./models/User'); // Import User model
const authRoutes = require('./auth'); 

const app = express(); // 1. Create the app first!
app.use(express.json());

// 2. Middleware & Static Files 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', authRoutes); // Now this works because 'app' exists

const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongodb:27017/skyy_db';

mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ Skyy-DB Connected"))
  .catch(err => console.error("❌ Connection Failed", err));

// --- API ROUTES ---

app.post('/api/contacts', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/contacts', async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

app.put('/api/contacts/:id', async (req, res) => {
    try {
        const updated = await Contact.findByIdAndUpdate(
            req.params.id, 
            { status: req.body.status }, 
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Full Edit (Update all fields)
app.put('/api/contacts/edit/:id', async (req, res) => {
    try {
        const { name, email, company } = req.body;
        const updated = await Contact.findByIdAndUpdate(
            req.params.id, 
            { name, email, company }, 
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/contacts/:id', async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted successfully" });
});

// 6. Add a Note to a Lead
app.post('/api/contacts/:id/notes', async (req, res) => {
    try {
        const { note } = req.body;
        const updated = await Contact.findByIdAndUpdate(
            req.params.id,
            { $push: { notes: note } }, // $push adds to the array
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('🚀 Skyy-CRM Server flying on port 3000'));