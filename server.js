const express = require('express');
const { connectDB } = require('./utils/connectDB');
const authRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
//connect to DB and start server
//start the server on port 3000
async function main() {
    await connectDB(); 
    return beginPort(); 
}

function beginPort() {
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => {
        console.log(`Listening on port http://localhost:${port}/`);
    });
    return server;
}


main().catch(console.error);
//convert data to json before sending    
app.use(express.json());
//use routes defined in userRoutes.js
app.use("/api/users",authRoutes);

//for testing
module.exports = { app, main };
