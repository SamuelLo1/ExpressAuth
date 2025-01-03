//next order of business:
// configure schema in db
// create route and set up listener on port 3000
// create user w/ PostMan testing register route


const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/userRoutes');
const http = require("http");

require('dotenv').config();


const app = express();

//convert data to json before sending to paths

//connects to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => beginPort())
    .catch((err) => console.log(err));

function beginPort() {
    app.listen(3000);
    console.log("Listening on port http://localhost:3000/");
}

//convert data to json before sending    
app.use(express.json());
//use routes defined in userRoutes.js
app.use("/api/users",authRoutes);


