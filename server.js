const express = require('express');
const { connectDB } = require('./utils/connectDB');
const authRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

//connect to DB and start server
function main(){
    connectDB();
    beginPort();
}


//function to start listening on port 3000
function beginPort() {
    app.listen(3000);
    console.log("Listening on port http://localhost:3000/"); 
}

main();
//convert data to json before sending    
app.use(express.json());

//use routes defined in userRoutes.js
app.use("/api/users",authRoutes);


