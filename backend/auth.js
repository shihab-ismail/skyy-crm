const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const JWT_SECRET = 'skyy_secret_key_123';

// LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user by username
        const user = await User.findOne({ username });

        // Compare password and issue token
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token });
        } 
        
        // If user not found or password wrong
        res.status(401).json({ error: "Invalid username or password" });
    } catch (err) {
        console.error("Auth Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;