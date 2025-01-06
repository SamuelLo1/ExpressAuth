const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { getSecrets } = require('../utils/getSecrets');



//users register with all required fields
async function registerUser(req, res) {
    const { name, email, password, isAdmin } = req.body;
    try {
        const user = await User.create({ name, email, password, isAdmin });
        res.status(201).json(user);
        console.log("User created");
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
        const secrets = await getSecrets();
        const JWT_SECRET = JSON.parse(secrets.SecretString).JWT_SECRET;
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
}


//to call this function pass in token as header in req
//token will verify and return the user info
async function viewProfile(req,res){
    try {
        // Step 1: Extract the token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }
        const token = authHeader.split(' ')[1];

        // Step 2: Fetch the JWT secret from AWS Secrets Manager
        const secrets = await getSecrets();
        const JWT_SECRET = JSON.parse(secrets.SecretString).JWT_SECRET;
        // Step 3: Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        // Step 4: Retrieve user information from the database
        const user = await User.findById(decoded.id).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Step 5: Return user data
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
}



module.exports = { registerUser , loginUser, viewProfile};