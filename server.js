//next order of business:
// configure schema in db
// create route and set up listener on port 3000
// create user w/ PostMan testing register route


const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/userRoutes');
const http = require("http");
const { GetSecretValueCommand, SecretsManagerClient } = require("@aws-sdk/client-secrets-manager");
require('dotenv').config();

const secret_name = "dev_test_secrets";
const app = express();

//connects to database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => beginPort())
    .catch((err) => console.log(err));

function beginPort() {
    app.listen(3000);
    console.log("Listening on port http://localhost:3000/");
    getSecrets(secret_name).then((data) => {
        console.log("secrets", data);
    }).catch((err) => {
        console.log("error fetching secrets", err);
    });
}


  

const getSecrets = async (secret_name) => {
    return await new Promise((resolve, reject) => {

        const client = new SecretsManagerClient({
            region: "us-east-2",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        client.send(new GetSecretValueCommand({
            SecretId: secret_name

        }), (err, data) => {
            if (err) {
                reject(err);
            } else {
                console.log(data);
                resolve(data);
            }
        });
    });
}



//convert data to json before sending    
app.use(express.json());
//use routes defined in userRoutes.js
app.use("/api/users",authRoutes);


