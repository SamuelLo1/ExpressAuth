//provide a function that can be called to get secrets from aws

const { GetSecretValueCommand, SecretsManagerClient } = require("@aws-sdk/client-secrets-manager");
require('dotenv').config();


const getSecrets = async () => {
    return await new Promise((resolve, reject) => {

        const client = new SecretsManagerClient({
            region: "us-east-2",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        client.send(new GetSecretValueCommand({
            SecretId: process.env.AWS_SECRET_NAME

        }), (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = { getSecrets };