# Blog API
This is a RESTful API for managing blog posts, built with NestJS and MySQL.

## Prerequisites
To run this API, you will need:

- Node.js (v14 or later)
- MySQL (v8 or later)
- Postman (or another API development tool)

## Installation
### Clone this repository:
`git clone https://github.com/niteshsinwar/blog-api.git`

### Install the dependencies:
```
cd blog-api
npm install
```
### Set up the MySQL database:
- Create a new database called blog_db
- Create a new user with full privileges on the blog database (make a note of the username and password)

### Configure the API:
- Create a new file called .env
- Edit the values in the .env file to match your MySQL database configuration

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=username
DB_PASSWORD=password
DB_DATABASE=blog
JWT_SECRET=secret

### Run the API:
-npm start
-The API will be available at http://localhost:3000.

Usage
Authentication
To use the API, you will need to authenticate by sending a POST request to /auth/login with your username and password:

bash
Copy code
POST http://localhost:3000/auth/login
Content-Type: application/json

{
    "username": "user",
    "password": "pass"
}
If your credentials are valid, you will receive a JWT token in the response:

css
Copy code
HTTP/1.1 200 OK
Content-Type: application/json

{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2MzE4MzQ4MzUsImV4cCI6MTYzMTg1MTIzNX0.XU1TfT_uV6nGRROoM-vi7EweB2z1YqY3I0fvxdR-rsU"
}
You will need to include this token in the Authorization header of subsequent requests, like this:

makefile
Copy code
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2MzE4MzQ4MzUsImV4cCI6MTYzMTg1MTIzNX0.XU1TfT_uV6nGRROoM-vi7EweB2z1YqY3I0fvxdR-rsU
Endpoints
POST /auth/signup - Create a new user account
Request Body:

json
Copy code
{
    "username": "user",
    "password": "pass"
}
Response:

css
Copy code
HTTP/1.1 201 Created
Content-Type: application/json

{
    "id": 1,
    "username": "user"
}
POST /auth/login - Authenticate and get a JWT token
Request Body:

json
Copy code
{
    "username": "user",



Nitesh Sinwar (adi)
continue
json
Copy code
"password": "pass"
}

makefile
Copy code

Response:

HTTP/1.1 200 OK
Content-Type: application/json

{
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2MzE4MzQ4MzUsImV4cCI6MTYzMTg1MTIzNX0.XU1TfT_uV6nGRROoM-vi7EweB2z1YqY3I0fvxdR-rsU"
}

sql
Copy code

- `GET /posts` - Get all blog posts

Response:

HTTP/1.1 200 OK
Content-Type: application/json

[
{
"id": 1,
"title": "First Post",
"content": "This is my first blog post.",
"created_at": "2022-01-01T00:00:00.000Z",
"updated_at": "2022-01-01T00:00:00.000Z"
},
{
"id": 2,
"title": "Second Post",
"content": "This is my second blog post.",
"created_at": "2022-01-02T00:00:00.000Z",
"updated_at": "2022-01-02T00:00:00.000Z"
}
]

vbnet
Copy code

- `GET /posts/:id` - Get a single blog post by ID

Response:

HTTP/1.1 200 OK
Content-Type: application/json

{
"id": 1,
"title": "First Post",
"content": "This is my first blog post.",
"created_at": "2022-01-01T00:00:00.000Z",
"updated_at": "2022-01-01T00:00:00.000Z"
}

javascript
Copy code

- `POST /posts` - Create a new blog post

Request Body:

{
"title": "New Post",
"content": "This is a new blog post."
}

makefile
Copy code

Response:

HTTP/1.1 201 Created
Content-Type: application/json

{
"id": 3,
"title": "New Post",
"content": "This is a new blog post.",
"created_at": "2022-01-03T00:00:00.000Z",
"updated_at": "2022-01-03T00:00:00.000Z"
}

bash
Copy code

- `PUT /posts/:id` - Update an existing blog post by ID

Request Body:

{
"title": "Updated Post",
"content": "This is an updated blog post."
}

makefile
Copy code

Response:

HTTP/1.1 200 OK
Content-Type: application/json

{
"id": 3,
"title": "Updated Post",
"content": "This is an updated blog post.",
"created_at": "2022-01-03T00:00:00.000Z",
"updated_at": "2022-01-04T00:00:00.000Z"
}

bash
Copy code

- `DELETE /posts/:id` - Delete an existing blog post by ID

Response:

HTTP/1.1 204 No Content
