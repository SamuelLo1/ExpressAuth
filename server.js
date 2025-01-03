//next order of business:
// configure schema in db
// create route and set up listener on port 3000
// create user w/ PostMan testing register route


const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/userRoutes');
require('dotenv').config();


const app = express();

//convert data to json before sending to paths
app.use(express.json());

//connects to database
async function connectDB() {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
}
connectDB().catch(console.error);



