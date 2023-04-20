# Nodejs/Express JWT Authentification

A basic authentification using JWT token. Implements an access & refresh token.

## Env variables

Make sure to update your `.env` file.

- Db Variables:
    * MONGODB_URL_PROD: Mongodb connection url for production.
    * MONGODB_URL_DEV: Mongodb connection url for development.

- JWT Variables:
    * ACCESS_TOKEN_SECRET: Access token secret.
    * REFRESH_TOKEN_SECRET: Refresh token secret.

- Environment:
    * NODE_ENV: Production/development...
    * PORT: Port to use for listening, defaults to 5000 if not set.

## Response format

* Success:
```json
{
    "msg": "success",
    "data": ...
}
```

* Error:
```json
{
    "msg": "error",
    "data": "Error msg"
}
```

## Authorization
Provide the authorization token via `Authorization` header as a bearer token.

```
Authorization: bearer eyJhbGciOiJIU...
```

## Routes

#### Auth ( /api/auth )
* **POST** `/api/auth/register`: Creates a new user.

Example request:
```http
POST /api/auth/register HTTP/1.1
Content-Type: application/json
Content-Length: 96

{
    "fullname": "First Last",
    "email": "Testuser@qa.team",
    "password": "TestPass123"
}
```

Example response:
```json
{
  "msg": "success",
  "data": {
    "user": {
      "fullname": "First Last",
      "email": "testuser@qa.team",
      "_id": "6422a818b2635e6e1e5f9aeb",
      "createdAt": "2023-03-28T08:40:56.274Z",
      "updatedAt": "2023-03-28T08:40:56.274Z",
      "__v": 0
    }
  }
}
```

* **POST** `/api/auth/login`: Generates an access token for the given email+password if valid.

Example request:
```http
POST /api/auth/login HTTP/1.1
Content-Type: application/json
Content-Length: 66

{
    "email": "Testuser@qa.team",
    "password": "TestPass123"
}
```

Example response:
```json
{
  "msg": "success",
  "data": {
    "access_token": "eyJhbGciOiJIU...",
    "refresh_token": "eyJhbGciOiJIUzR5c..."
  }
}
```

* **POST** `/api/auth/logout`: Log the user out. Disables the given access token (& the refresh token associated with.)

Example request
```http
POST /api/auth/logout HTTP/1.1
Authorization: Bearer eyJhbGciOiJIU...
```

Example response
```json
{
  "msg": "success",
  "data": null
}
```

* **POST** `/api/auth/refresh`: Use refresh token to generate new pair of access/refresh tokens.

Example request
```http
POST /api/auth/refresh HTTP/1.1
Authorization: Bearer eyJhbGciOiJIU...
```

Example response
```json
{
  "msg": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI...",
    "refresh_token": "eyJhbGciOiJIUzI..."
  }
}
```

---

#### User ( /api/user )

* **GET** `/api/user/`: Get current user info.

Example request
```http
GET /api/user HTTP/1.1
Authorization: bearer eyJhbGciOiJIU...
```

Example response:
```json
{
  "msg": "success",
  "data": {
    "_id": "6422a818b2635e6e1e5f9aeb",
    "fullname": "First Last",
    "email": "testuser@qa.team",
    "createdAt": "2023-03-28T08:40:56.274Z",
    "updatedAt": "2023-03-28T08:40:56.274Z",
    "__v": 0
  }
}
```

* **GET** `/api/user/:id`: Get user info of the given id.

Example request
```http
GET /api/user/6422a818b2635e6e1e5f9aeb HTTP/1.1
Authorization: bearer eyJhbGciOiJIU...
```

Example response:
```json
{
  "msg": "success",
  "data": {
    "_id": "6422a818b2635e6e1e5f9aeb",
    "fullname": "First Last",
    "email": "testuser@qa.team",
    "createdAt": "2023-03-28T08:40:56.274Z",
    "updatedAt": "2023-03-28T08:40:56.274Z",
    "__v": 0
  }
}
```

* **PATCH** `/api/user/`: Change current user's info.

Example request
```http
PATCH /api/user HTTP/1.1
Authorization: bearer eyJhbGciOiJIU...
Content-Type: application/json
Content-Length: 38

{
    "fullname": "Test Name Change"
}
```

Example response:
```json
{
  "msg": "success",
  "data": {
    "_id": "6422a818b2635e6e1e5f9aeb",
    "fullname": "Test Name Change",
    "email": "testuser@qa.team",
    "createdAt": "2023-03-28T08:40:56.274Z",
    "updatedAt": "2023-03-28T08:40:56.274Z",
    "__v": 0
  }
}
```

* **PATCH** `/api/user/password`: Change current user's password.

Example request
```http
PATCH /api/user/password HTTP/1.1
Authorization: bearer eyJhbGciOiJIU...
Content-Type: application/json
Content-Length: 67

{
    "password": "TestPass123",
    "currentPass": "TestPass123"
}
```

Example response:
```json
{
  "msg": "success",
  "data": {
    "_id": "6422a818b2635e6e1e5f9aeb",
    "fullname": "Test Name Change",
    "email": "testuser@qa.team",
    "createdAt": "2023-03-28T08:40:56.274Z",
    "updatedAt": "2023-03-28T08:40:56.274Z",
    "__v": 0
  }
}
```

* **DELETE** `/api/user`: Delete current user's account. Uses a soft delete.

Example request
```http
DELETE /api/user/ HTTP/1.1
Authorization: bearer eyJhbGciOiJIU...
```

Example response:
```json
{
  "msg": "success",
  "data": {
    "_id": "6422a818b2635e6e1e5f9aeb",
    "fullname": "Test Name Change",
    "email": "testuser@qa.team",
    "createdAt": "2023-03-28T08:40:56.274Z",
    "updatedAt": "2023-03-28T08:40:56.274Z",
    "__v": 0
  }
}
```
