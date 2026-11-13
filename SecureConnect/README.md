# Secure Connect and Communication Platform

## Overview
Secure Connect and Communication Platform is a backend application developed using Node.js and Express.js. It provides secure user authentication, protected resources, personal notes management, and real-time communication.

## Features

### 1. User Authentication
- User signup and login.
- Password hashing using bcrypt.
- JWT token generation and verification.

### 2. Protected Routes
- Authentication middleware.
- Access control using JWT.
- Role-Based Access Control (RBAC) for admin and user roles.

### 3. Secure Notes API
- Create personal notes.
- Retrieve personal notes.
- Update existing notes.
- Delete notes.
- Users can access only their own notes.

### 4. Real-Time Communication
- Socket.IO integration.
- Real-time message broadcasting.
- JWT authentication for socket connections.

### 5. Event-Driven Features
- Node.js EventEmitter.
- Events for note creation and chat messages.

### 6. Environment Configuration
- dotenv for managing environment variables.
- Sensitive configuration excluded from version control.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/signup | Register a user |
| POST | /api/auth/login | Login a user |
| POST | /api/notes | Create a note |
| GET | /api/notes | Get personal notes |
| PUT | /api/notes/:id | Update a note |
| DELETE | /api/notes/:id | Delete a note |
| GET | /api/notes/admin/all | Admin-only notes access |


