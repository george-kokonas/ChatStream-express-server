# ChatStream - Express Server

This repository contains the Express server for ChatStream, a real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO. The Express server is responsible for handling API requests and database operations for the chat application.

## Project Overview

This repository is part of a larger project that includes the following components as well:

- [Socket Server](https://github.com/george-kokonas/ChatStream-socket-server): The Socket server handles real-time communication between clients in the ChatStream application.
- [React Client](https://github.com/george-kokonas/ChatStream-react-client): The React client component provides the user interface for ChatStream, allowing users to interact with the application.

You can explore these repositories to learn more about the other components of the project.

Click [here](https://chatstream.netlify.app) to see ChatStream running!

## Features

- User Registration and Login : Register, login and logout functionality for users using bcrypt for password hashing and JWT (JSON Web Token) for secure authentication.
- Message Storage : Save users messages on the database to enable message retrieval when users revisit the application.
- Unread Messages Notifications: Notify users about unread messages when they log in to the application.
- Last Message Preview: Handle client's request to display preview of the last message, allowing users to get a glimpse of the recent conversation without opening the chat.
- User Profile: Manage profile picture and additional information sent by the client. Profile pictures are securely stored on Cloudinary. The server saves the link to the uploaded image in the database, allowing for easy retrieval and display of user profile picture.

## Prerequisites

To run the socket server locally, you need to have the following installed on your system:

- Node.js (version >= 14)
- npm (Node Package Manager)

If you don't have Node.js or npm installed, you can visit the [Node.js](https://nodejs.org/) website for further guidance on installation.

## Dependencies

The following dependencies are required for running the Express server:

- [express](https://expressjs.com/) : A fast and minimalistic web application framework for Node.js, providing robust routing and middleware capabilities

- [mongoose](https://mongoosejs.com/): A MongoDB object modeling tool for Node.js that provides a straightforward, schema-based solution to model application data and interact with MongoDB databases

- [cors](https://www.npmjs.com/package/cors): A middleware for enabling Cross-Origin Resource Sharing (CORS) in the Express server, allowing requests from different origins

- [dotenv](https://www.npmjs.com/package/dotenv): A module for loading environment variables from a .env file into process.env, simplifying configuration management

- [bcrypt](https://www.npmjs.com/package/bcrypt): A library for hashing passwords and comparing hashed passwords during authentication

- [jsonwebtoken](https://jwt.io/): A library for generating and verifying JSON Web Tokens (JWT) for secure authentication, facilitating user authentication and authorization.

- [cloudinary](https://cloudinary.com/): A cloud-based media management platform for securely storing user profile pictures.

- [express-async-handler](https://www.npmjs.com/package/express-async-handler): A utility module for handling asynchronous errors in Express route handlers, simplifying error handling in asynchronous code.

## Installation

### 1. Clone the repository:

```
git clone git@github.com:george-kokonas/ChatStream-express-server.git

```

### 2. Navigate to the project directory:

```
cd ChatStream-express-server
```

### 3. Install the dependencies:

- Using npm:

```
npm install
```

- Using Yarn:

```
yarn install
```

## Obtain Services Credentials

To use certain features of the application, you will need to obtain credentials for the following services:

- `MongoDB Atlas` : MongoDB Atlas is a cloud-based database service used for storing user data. Follow these steps to obtain the MongoDB URI:

  1. Visit the [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) website and create an account.
  2. Create a new project and cluster within the MongoDB Atlas dashboard.
  3. Obtain the MongoDB URI by navigating to the cluster settings and copy the connection string.

  
- Cloudinary: Cloudinary is a cloud-based media management platform used for securely storing user profile pictures. Follow these steps to obtain the Cloudinary credentials:
  1. Visit the [Cloudinary](https://cloudinary.com/) website and create an account
  2. Obtain the Cloudinary cloud name, API key, and API secret from the Cloudinary dashboard.

## Create the `.env` file:

1. In the root directory of the express server create a new file named `.env`
2. Open the `.env` file and add the following content:

```js
DB_URI=<your_mongodb_uri>
SALT_ROUNDS=<your_preference>
JWT_SECRET=<your_preference>

CLOUDINARY_NAME=<your_cloudinary_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
```

3.  In the `.env` file replace the placeholder values for `DB_URI`, `CLOUDINARY_NAME`,`CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` with the values obtained from the services (see steps above at Obtain Services Credentials section)

4.  Replace placeholder values for `SALT_ROUNDS` with an integer (a common value is 10) and
    `JWT_SECRET` with a string of your preference

    #### Note : To protect sensitive information and avoid sharing it publicly, make sure to add the `.env` file to your project's `.gitignore` file. This will prevent the file from being included in your version control system and inadvertently exposing your credentials and API keys. It's essential to keep this file private.

## Start the server:

- Using npm:

```
npm start
```

- Using yarn:

```
Using npm:
```

The server will be running at `http://localhost:8000` by default, or you can specify a different port if needed
in `server.js` file.

## API Documentation

### User Registration

- **Endpoint:** /auth/register
- **Method:** POST
- **Access:** Public
- **Description:** Registers a new user with the provided credentials and generates a JWT token.

### User Login

- **Endpoint:** /auth/login
- **Method:** POST
- **Access:** Public
- **Description:** Authenticates the user and generates a JWT token.

### Retrieve User Data

- **Endpoint:** /user/getUser
- **Method:** GET
- **Access:** Private
- **Description:** Retrieves user data after successfull log in.

### Retrieve Registered Users

- **Endpoint:** /user/getRegisteredUsers
- **Method:** GET
- **Access:** Private
- **Description:** Retrieves a list with all registered users.

### Upload Profile Image

- **Endpoint:** /profile/setImage
- **Method:** POST
- **Access:** Private
- **Description:** Uploads profile image to cloudinary and saves returned link to database.

### Update Profile Info Text

- **Endpoint:** /profile/setInfo
- **Method:** POST
- **Access:** Private
- **Description:** Updates users profile info field to database.

### Create New Chatroom

- **Endpoint:** /chat/createChatRoom
- **Method:** POST
- **Access:** Private
- **Description:** Creates new chatroom with two participants.

### Retrieve Existing Chatroom

- **Endpoint:** /chat/getChatRoom/:userId
- **Method:** GET
- **Access:** Private
- **Description:** Retrieves already existing chatroom by user Id.

### Retrieve New Chatroom

- **Endpoint:** /chat/getNewChatRoom/:roomId
- **Method:** GET
- **Access:** Private
- **Description:** Retrieves chatroom by room Id immediatly after the first sent message.

### Create New Message

- **Endpoint:** /chat/createMessage
- **Method:** POST
- **Access:** Private
- **Description:** Saves message to database after it is sent.

### Retrieve Messages

- **Edponint:** /chat/getMessages/:requestedRoomId
- **Method:** Get
- **Access:** Private
- **Description:** Retrieves messages by room Id.

### Retrieve Last Message

- **Endpoint:** /chat/getLastMessages/:roomsIds
- **Method:** GET
- **Access:** Private
- **Description:** Retrieves last sent messages by room Id for every room. It is used on client side for messages previews.

### Retrieve Unseen Messages

- **Endpoint:** /chat/getUnseenMessages/:userId
- **Method:** GET
- **Access:** Private
- **Description:** Retrieves unread messages by user Id. It is used on client side to render notifications for the messages received by the user while he was not using the application.

### Update Message Status

- **Endpoint:** /chat/updateMessagesStatus
- **Method:** PUT
- **Access:** Private
- **Description:** Updates the message status from unseen to seen when the user enters a room with unread messages.

## Usage Examples

### Example 1.

- successful request :

```js
Request:
POST /auth/register

Body:
{
  "email": "user@example.com",
  "username": "john_doe",
  "password": "password123"
}

Response:
Status: 200 OK
{
  "userData": {
    "email": "user@example.com",
    "username": "john_doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmQzZjE1NzE0ODQwMzUxN2M2MGEwYyIsImlhdCI6MTYxNjU1NjA0MywiZXhwIjoxNjE2NjQyNDQzfQ.0YYtVdRppjhO-LYnUbSvF4DwvOWtzTKT7YdImGhClUE"
}
```

- unsuccessful request :

```js
Request:
POST /auth/register

Body:
{
  "email": "user@example.com",
  "username": "john_doe",
  "password": "password123"
}

Response:
Status: 400 Bad Request
{
  "message": "Email already registered..."
}

```

### Example 2.

- successful request :

```js
Request:
GET /chat/getMessages/room123

Response:
Status: 200 OK
[
  {
    "_id": "message1",
    "roomId": "room123",
    "senderId": "user1",
    "receiverId": "user2",
    "text": "Hello, how are you?",
    "isSeen": false,
    "createdAt": "2022-05-15T10:30:00Z"
  },
  {
    "_id": "message2",
    "roomId": "room123",
    "senderId": "user2",
    "receiverId": "user1",
    "text": "I'm good, thanks!",
    "isSeen": false,
    "createdAt": "2022-05-15T10:31:00Z"
  },
  ...
]

```

- unsuccessful request :

```js
Request:
GET /chat/getMessages/room456

Response:
Status: 404 Not Found
{
  "message": "Unable to retrieve messages..."
}

```

## Feedback and Contributions

Any feedback, ideas, suggestions, or bug reports you may have regarding this project are welcome! If you would like to contribute to the development of this application, please contact me. Together, we can make ChatStream better!

For any inquiries or direct communication, you can reach out to me via email at [g.kokwnas@gmail.com](mailto:g.kokwnas@gmail.com).

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).

You are free to use, modify, and distribute this project for personal or commercial purposes. Please see the [LICENSE](LICENSE) file for more details.
