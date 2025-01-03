const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();


router.post('/register', userControllers.registerUser);

module.exports = router;