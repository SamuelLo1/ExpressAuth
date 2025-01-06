process.env.PORT = 4000; // Set the port to 4000 for testing

const request = require('supertest');
const { main, app } = require('../server');
const { disconnectDB } = require('../utils/connectDB');

let server;

async function startServer(){
    server = await main(); // Start the server and save the instance
};

async function stopServer(){
    await disconnectDB(); // Disconnect from the database
    server.close(); // Close the server
};
startServer();
describe('User Routes', () => {
    let token;

    // Test the registration route
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                name: 'Test User3',
                email: 'testuser3@example.com',
                password: 'testpassword3',
                isAdmin: false
            });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('email', 'testuser3@example.com');
    });

    // Test the login route
    it('should login a user and return a JWT token', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'testuser3@example.com',
                password: 'testpassword3'
            });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token; // Save the token for future tests
    });

    // Test the profile route
    it('should return the user profile', async () => {
        const res = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('email', 'testuser3@example.com');
    });
});

stopServer();