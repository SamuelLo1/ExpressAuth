const mongoose = require('mongoose');
const { getSecrets } = require('./getSecrets');


async function connectDB() {
    try {
        //
        const secrets = await getSecrets();
        const MONGO_URI = JSON.parse(secrets.SecretString).MONGO_URI;
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit process with failure
    }
}

async function disconnectDB(){
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
}

module.exports = { connectDB, disconnectDB };