const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//create user in db
async function registerUser(req, res) {
    const { name, email, password, isAdmin } = req.body;
    try {
        console.log("register endpoint hit")
        const user = await User.create({ name, email, password, isAdmin });
        res.status(201).json(user);
        res.send("User created");
    } catch (err) {
        console.log("error fetching",err);
        res.status(400).json({ error: err.message });
    }
}

//user uses email and password to login
//check if password matches with bcrypt hash and generate a jwt token if so 
async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        //const secrets = await getSecret('your-secret-name');
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
}

module.exports = { registerUser , loginUser};