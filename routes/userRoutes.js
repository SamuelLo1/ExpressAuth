const User = require('../models/User');
//const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    const { name, email, password, isAdmin } = req.body;
    try {
        const user = await User.create({ name, email, password, isAdmin });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = { registerUser };