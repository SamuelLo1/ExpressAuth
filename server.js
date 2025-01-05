const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

//connects to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => beginPort())
    .catch((err) => console.log(err));

//function to start listening on port 3000
function beginPort() {
    app.listen(3000);
    console.log("Listening on port http://localhost:3000/"); 
}

//convert data to json before sending    
app.use(express.json());

//use routes defined in userRoutes.js
app.use("/api/users",authRoutes);


