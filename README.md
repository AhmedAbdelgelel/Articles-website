# Article Page API Documentation

This document provides comprehensive documentation for all API endpoints in the Article Page application. It is intended for frontend developers who need to integrate with the backend API.

## Table of Contents

- [Authentication](#authentication)
- [Users](#users)
- [Categories](#categories)
- [Answers](#answers)

## Base URL

All API endpoints are prefixed with: `/api/v1`

## Authentication

Most endpoints require authentication using JWT (JSON Web Token). To authenticate, include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Authentication Endpoints

#### Register a new user

- **URL**: `/auth/signup`
- **Method**: `POST`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "status": "success",
    "token": "jwt_token_here",
    "data": {
      "name": "User Name",
      "email": "user@example.com",
      "role": "user"
    }
  }
  ```

#### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Authentication**: None
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "token": "jwt_token_here",
    "data": {
      "name": "User Name",
      "email": "user@example.com",
      "role": "user"
    }
  }
  ```

#### Change Password

- **URL**: `/auth/changeMyPassword`
- **Method**: `PUT`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "currentPassword": "current_password",
    "newPassword": "new_password"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "token": "new_jwt_token_here",
    "data": {
      "name": "User Name",
      "email": "user@example.com",
      "role": "user"
    }
  }
  ```

#### Recover Account

- **URL**: `/auth/recoverMe`
- **Method**: `PUT`
- **Authentication**: Required
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "message": "Account recovered successfully"
  }
  ```

#### Logout

- **URL**: `/auth/logout`
- **Method**: `GET`
- **Authentication**: Required
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "message": "Logged out successfully"
  }
  ```

## Users

### User Endpoints

#### Get Current User Data

- **URL**: `/users/getMe`
- **Method**: `GET`
- **Authentication**: Required
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "data": {
      "name": "User Name",
      "email": "user@example.com",
      "role": "user"
    }
  }
  ```

#### Update Current User Password

- **URL**: `/users/updateMyPassword`
- **Method**: `PUT`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "currentPassword": "current_password",
    "newPassword": "new_password"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "token": "new_jwt_token_here",
    "data": {
      "name": "User Name",
      "email": "user@example.com",
      "role": "user"
    }
  }
  ```

#### Update Current User Data

- **URL**: `/users/updateMe`
- **Method**: `PUT`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "name": "New Name",
    "email": "newemail@example.com"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "data": {
      "name": "New Name",
      "email": "newemail@example.com",
      "role": "user"
    }
  }
  ```

#### Delete Current User

- **URL**: `/users/deleteMe`
- **Method**: `DELETE`
- **Authentication**: Required
- **Response**: `204 No Content`

### Admin User Endpoints

> These endpoints require admin privileges

#### Get All Users

- **URL**: `/users`
- **Method**: `GET`
- **Authentication**: Required (Admin only)
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "results": 2,
    "data": [
      {
        "name": "User 1",
        "email": "user1@example.com",
        "role": "user"
      },
      {
        "name": "Admin",
        "email": "admin@example.com",
        "role": "admin"
      }
    ]
  }
  ```

#### Create User

- **URL**: `/users`
- **Method**: `POST`
- **Authentication**: Required (Admin only)
- **Request Body**:
  ```json
  {
    "name": "New User",
    "email": "newuser@example.com",
    "password": "password123",
    "role": "user"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "status": "success",
    "data": {
      "name": "New User",
      "email": "newuser@example.com",
      "role": "user"
    }
  }
  ```

#### Get User by ID

- **URL**: `/users/:id`
- **Method**: `GET`
- **Authentication**: Required (Admin only)
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "data": {
      "name": "User Name",
      "email": "user@example.com",
      "role": "user"
    }
  }
  ```

#### Update User

- **URL**: `/users/:id`
- **Method**: `PUT`
- **Authentication**: Required (Admin only)
- **Request Body**:
  ```json
  {
    "name": "Updated Name",
    "email": "updated@example.com",
    "role": "admin"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "data": {
      "name": "Updated Name",
      "email": "updated@example.com",
      "role": "admin"
    }
  }
  ```

#### Delete User

- **URL**: `/users/:id`
- **Method**: `DELETE`
- **Authentication**: Required (Admin only)
- **Response**: `204 No Content`

## Categories

### Category Endpoints

#### Get All Categories

- **URL**: `/categories`
- **Method**: `GET`
- **Authentication**: None
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "results": 2,
    "data": [
      {
        "_id": "category_id_1",
        "name": "Category 1",
        "nameAr": "الفئة 1",
        "answers": []
      },
      {
        "_id": "category_id_2",
        "name": "Category 2",
        "nameAr": "الفئة 2",
        "answers": []
      }
    ]
  }
  ```

#### Create Category

- **URL**: `/categories`
- **Method**: `POST`
- **Authentication**: Required (Admin only)
- **Request Body**:
  ```json
  {
    "name": "New Category",
    "nameAr": "فئة جديدة",
    "color": "#FF5733"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "status": "success",
    "data": {
      "_id": "new_category_id",
      "name": "New Category",
      "nameAr": "فئة جديدة",
      "color": "#FF5733",
      "answers": []
    }
  }
  ```

#### Get Category by ID

- **URL**: `/categories/:id`
- **Method**: `GET`
- **Authentication**: None
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "data": {
      "_id": "category_id",
      "name": "Category Name",
      "nameAr": "اسم الفئة",
      "answers": []
    }
  }
  ```

#### Update Category

- **URL**: `/categories/:id`
- **Method**: `PUT`
- **Authentication**: Required (Admin only)
- **Request Body**:
  ```json
  {
    "name": "Updated Category",
    "nameAr": "فئة محدثة",
    "color": "#33FF57"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "data": {
      "_id": "category_id",
      "name": "Updated Category",
      "nameAr": "فئة محدثة",
      "color": "#33FF57",
      "answers": []
    }
  }
  ```

#### Delete Category

- **URL**: `/categories/:id`
- **Method**: `DELETE`
- **Authentication**: Required (Admin only)
- **Response**: `204 No Content`

#### Get Category with Answers

- **URL**: `/categories/:id/with-answers`
- **Method**: `GET`
- **Authentication**: None
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "data": {
      "_id": "category_id",
      "name": "Category Name",
      "nameAr": "اسم الفئة",
      "answers": [
        {
          "_id": "answer_id_1",
          "title": "Answer 1",
          "titleAr": "إجابة 1",
          "content": "Answer content",
          "contentAr": "محتوى الإجابة"
        },
        {
          "_id": "answer_id_2",
          "title": "Answer 2",
          "titleAr": "إجابة 2",
          "content": "Answer content",
          "contentAr": "محتوى الإجابة"
        }
      ]
    }
  }
  ```

## Answers

### Answer Endpoints

#### Get All Answers

- **URL**: `/answers`
- **Method**: `GET`
- **Authentication**: None
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "results": 2,
    "data": [
      {
        "_id": "answer_id_1",
        "title": "Answer 1",
        "titleAr": "إجابة 1",
        "content": "Answer content",
        "contentAr": "محتوى الإجابة",
        "category": "category_id_1"
      },
      {
        "_id": "answer_id_2",
        "title": "Answer 2",
        "titleAr": "إجابة 2",
        "content": "Answer content",
        "contentAr": "محتوى الإجابة",
        "category": "category_id_2"
      }
    ]
  }
  ```

#### Create Answer

- **URL**: `/answers`
- **Method**: `POST`
- **Authentication**: Required (Admin only)
- **Request Body**:
  ```json
  {
    "title": "New Answer",
    "titleAr": "إجابة جديدة",
    "content": "Answer content goes here",
    "contentAr": "محتوى الإجابة هنا",
    "category": "category_id"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "status": "success",
    "data": {
      "_id": "new_answer_id",
      "title": "New Answer",
      "titleAr": "إجابة جديدة",
      "content": "Answer content goes here",
      "contentAr": "محتوى الإجابة هنا",
      "category": "category_id"
    }
  }
  ```

#### Get Answer by ID

- **URL**: `/answers/:id`
- **Method**: `GET`
- **Authentication**: None
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "data": {
      "_id": "answer_id",
      "title": "Answer Title",
      "titleAr": "عنوان الإجابة",
      "content": "Answer content",
      "contentAr": "محتوى الإجابة",
      "category": "category_id"
    }
  }
  ```

#### Update Answer

- **URL**: `/answers/:id`
- **Method**: `PUT`
- **Authentication**: Required (Admin only)
- **Request Body**:
  ```json
  {
    "title": "Updated Answer",
    "titleAr": "إجابة محدثة",
    "content": "Updated content",
    "contentAr": "محتوى محدث",
    "category": "category_id"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "status": "success",
    "data": {
      "_id": "answer_id",
      "title": "Updated Answer",
      "titleAr": "إجابة محدثة",
      "content": "Updated content",
      "contentAr": "محتوى محدث",
      "category": "category_id"
    }
  }
  ```

#### Delete Answer

- **URL**: `/answers/:id`
- **Method**: `DELETE`
- **Authentication**: Required (Admin only)
- **Response**: `204 No Content`
