# ExpressAuth

This Express API has user management functionality allowing users to register a new account, log in to their account, and view their account. By running the express server, HTTP requests can be sent to the server to perform certain user actions at different routes. The API has multiple routes set up: one for registration, one for login, and one for profile view.

Users are stored in a Mongo DB cluster after registration. JWT tokens are used to verify a user is logged in properly before being able to view protected routes such as "/api/users/profile".
For enhanced security on Database URI and JWT secret, both will be stored in the AWS secret manager. 

### Setup:

1. clone this repository into an empty folder
2. setup environment variables:

   - MongoDB URI
   - JWT Secret

3) run `npm i` to install all node module dependencies and you are set!

### Using the API:

   Start the server by running `npm run dev` in the terminal. If everything is connected, the text "Listening on port http://localhost:3000/" should appear in the console.


#### API calls:
1. To register a user:
   send a POST request to http://localhost:3000/api/users/register
   with the following body:
      
      ```
      {
         "name":"Input_name",
         "email":"Valid_email",
         "password":"Input_password",
         "isAdmin":false
      }
      ```

   Upon success, the user object is returned as the response
   
2. To login an existing user:
   send a POST request to http://localhost:3000/api/users/login
   with the following body:
      ```
      {
         "email": "Existing_email",
         "password": "Existing_password"  
      }
      ```

   Upon success, a temporary JWT token is returned as a response (the token has a time limit of 1hr so it will need to be refreshed when not working)
3. To view a user profile:
   send a GET request to http://localhost:3000/api/users/profile
   with the following added to header:
      ```
      {
         "authorization" : "Bearer {JWT token}"
      }
      ```
   (using Postman tool add an extra field to the header in the request with key : "authorization" , value : "Bearer {JWT token}")
   if you get a server error try getting a new JWT token as the previous token may have expired
   


### Versions:
   Node.js : v20.5.1
