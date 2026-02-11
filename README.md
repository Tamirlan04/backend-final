# Print Service Web Application

Final Project – Full Stack Web Application

## Project Description

This project is a full-stack web application for managing printing orders (T-shirt print, booklet, etc.).
Users can register, log in, and submit printing orders.
Administrators can view all orders and update their status.

The system includes:

* User authentication with JWT
* Order creation system
* Role-based access control (User / Admin)
* Protected API routes
* MongoDB database integration

---

## Tech Stack

Backend:

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* CORS

Frontend:

* HTML
* CSS
* JavaScript (Fetch API)
* jQuery

---

## Features

### Authentication

* User registration
* User login
* JWT token generation
* Protected routes using middleware
* Token-based authorization

### Orders (User)

* Create new order
* View personal orders
* Protected order submission

### Orders (Admin)

* View all orders
* Update order status
* Role-based access control

---

## Project Structure

```
backend/
 ├── models/
 │    └── Order.js
 │    └── User.js
 ├── routes/
 │    └── auth.routes.js
 │    └── orders.routes.js
 ├── middlewares/
 │    └── auth.js
 │    └── adminMiddleware.js
 │    └── errorHandler.js
 │    └── notFound.js
 ├── app.js
 ├── server.js
```

---

## Installation & Run

### 1. Clone the repository

```
git clone <your-repo-link>
cd backend
```

### 2. Install dependencies

```
npm install
```

### 3. Create .env file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run server

```
npm run dev
```

or

```
node server.js
```

Server runs on:

```
http://localhost:5000
```

---

## API Endpoints

### Auth

POST /api/auth/register
POST /api/auth/login

---

### Orders

POST /api/orders
GET /api/orders/my
GET /api/orders (Admin only)
PATCH /api/orders/:id/status (Admin only)

---

## Security

* JWT authentication
* Protected routes with middleware
* Role-based access (user / admin)
* Server-side validation
* Error handling middleware

---

## Database Models

### User

* email
* password (hashed)
* role

### Order

* userId (reference to User)
* name
* phone
* printType
* deadline
* quantity
* status
* timestamps

---

## Error Handling

The project includes:

* Custom error handler middleware
* 404 route handler
* Try/catch blocks in controllers

---

## Future Improvements

* File upload support with Multer
* Payment integration
* Order tracking system
* Email notifications
* Admin dashboard UI
* Validation with Joi

---

## Author
Tamirlan Kyzylov - SE-2433
Final Exam Project
Back End Web Development
