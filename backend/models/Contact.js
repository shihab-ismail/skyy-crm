const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    company: String,
    status: { 
        type: String, 
        // We updated these to match the Dashboard dropdowns
        enum: ['New', 'In Progress', 'Closed'], 
        default: 'New' 
    },
    notes: [String],
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', ContactSchema);