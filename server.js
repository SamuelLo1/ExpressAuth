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
app.use(express.json());
app.use('/auth', authRoutes);

//connects to database
async function connectDB() {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
}
connectDB().catch(console.error);

const hostname = "127.0.0.1";
const port = 3000;

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {
  //Set the response HTTP header with HTTP status and Content type
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

