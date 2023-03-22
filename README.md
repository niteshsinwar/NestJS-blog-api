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

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=username
DB_PASSWORD=password
DB_DATABASE=blog
JWT_SECRET=secret
```


### Run the API:
```
npm start
The API will be available at http://localhost:3000.
```

## Usage
### Authentication
To use the API, you will need to authenticate by sending a POST request to /auth/login with your username and password:

- `POST /auth/signup - Create a new user account`

###### Request Body:

```
 {
      "username": "Admin",
      "password": "12345678"
    }
```
###### Response:
```
{
    "username": "Admin",
    "password": "$2b$10$WA0EplkWDvf2Cbst7qTI/u2aw/QIQX5FOGigq0tRbaKVLvan8k4QW"
}
```
- `POST /auth/login  - to login the account`
###### Request body:
```
 {
      "username": "Admin",
      "password": "12345678"
    }
```
###### Response:

```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZG1pbiIsImlhdCI6MTY3OTQ5MTA4NCwiZXhwIjoxNjc5NTc3NDg0fQ.vSqxk-5OcVkzEhTiHW7Okq3AYYjsEUTWh_boKwv91IE"
}
```



### CRUD operation on posts
Some of the basic CRUD operation on blog posts, where some of the sensative function require authentication:

- `GET /post - Get all blog posts`

###### Response:

```
[
    {
        "id": 1,
        "title": "1st blog post.",
        "content": "this is my first blog post",
        "author": "Admin"
    },
    {
        "id": 2,
        "title": "2nd blog post.",
        "content": "this is my second blog post",
        "author": "Admin"
    },
    {
        "id": 3,
        "title": "3rd blog post.",
        "content": "this is my third blog post",
        "author": "Admin"
    }
]
```

- `GET /post/:id - Get a single blog post by ID`

###### Response:

```
{
    "id": 1,
    "title": "1st blog post.",
    "content": "this is my first blog post",
    "author": "Admin"
}
```

 #### Note: For below functions you also need to pass JWT token and username in parameters as these functions required authentication and authorization.
- `POST /post - Create a new blog post`

###### Request Body:
```
  {
        "id": 3,
        "title": "3rd blog post.",
        "content": "this is my third blog post"
    }
```


###### Response:

```
{
    "id": 3,
    "title": "3rd blog post.",
    "content": "this is my third blog post",
    "author": "Admin"
}
```

- `PUT /post/:id - Update an existing blog post by ID`

###### Request Body:
```
 {
        "title": "Modified first blog post.",
        "content": "this is my modified first blog post"
    }
```

###### Response:

```
{
    "id": 1,
    "title": "Modified first blog post.",
    "content": "this is my modified first blog post",
    "author": "Admin"
}
```


- `DELETE /post/:id - Delete an existing blog post by ID`

###### Response:
```
{
    "title": "Modified first blog post.",
    "content": "this is my modified first blog post",
    "author": "Admin"
}
```
