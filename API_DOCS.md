# PixLoop API Documentation

Base URL: `https://pixloop-backend.onrender.com/api`

## Authentication

### Register User
- **URL:** `/auth/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response:** `201 Created`
  - Returns user object with JWT token.

### Login User
- **URL:** `/auth/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response:** `200 OK`
  - Returns user object with JWT token.

### Get Current User
- **URL:** `/auth/me`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** `200 OK`

---

## Posts

### Create Post
- **URL:** `/posts`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
- **Body:**
  - `image` (File)
  - `caption` (String)
- **Success Response:** `201 Created`

### Get All Posts
- **URL:** `/posts`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** `200 OK`

### Get Single Post
- **URL:** `/posts/:id`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** `200 OK`

### Delete Post
- **URL:** `/posts/:id`
- **Method:** `DELETE`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** `200 OK`

---

## Interactions

### Like Post
- **URL:** `/posts/:id/like`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** `200 OK`

### Unlike Post
- **URL:** `/posts/:id/like`
- **Method:** `DELETE`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** `200 OK`

### Add Comment
- **URL:** `/posts/:id/comments`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "comment": "Nice photo!"
  }
  ```
- **Success Response:** `201 Created`

### Get Comments
- **URL:** `/posts/:id/comments`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Success Response:** `200 OK`
