const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt'); // For password hashing
const loginpage =require ('./loginpage.ejs')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Set up EJS as view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Administrator')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define schema and model for user
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);

// Middleware to parse JSON
app.use(express.json());

// CORS middleware with specific origin
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your frontend URL
}));

// Route for user login
app.post('/api/loginpage', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username in MongoDB
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid username or password.' });
        }

        // Compare passwords using bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: 'Invalid username or password.' });
        }

        // Generate JWT token with no expiration
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: null });

        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, message: 'An error occurred while logging in.' });
    }
});

// Default route handler
app.get('/api/loginpage', (req, res) => {
    res.send('Welcome to the authentication API.');
     res.render('loginpage', { reactComponent: '<loginpage />' });

});

// Simulate login request from frontend
fetch('http://localhost:3000/api/loginpage', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
    }),
})
.then(response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error('Network response was not ok.');
})
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('There was a problem with the login request:', error);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
