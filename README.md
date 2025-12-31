# AuthForge

## Overview
AuthForge is a production-grade authentication and authorization system for Node.js web applications. It provides secure user identity management, role-based access control, and robust token-based session handling. Designed for scalability and security, AuthForge is ideal for SaaS platforms, dashboards, APIs, and enterprise apps.

## Features
- **User Authentication**: Signup, login, logout with secure password hashing (bcrypt)
- **Token Management**: JWT access & refresh tokens, HTTP-only cookies, refresh token rotation
- **Role-Based Access Control (RBAC)**: USER, ADMIN, MODERATOR, SUPERADMIN (extensible)
- **Route Protection**: Middleware for JWT verification and role validation
- **Security Best Practices**: Password hashing, JWT signature verification, secure cookies, input validation
- **Extensible**: Easy to add new roles, OAuth/social login, multi-tenant support

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT, bcrypt, HTTP-only cookies
- **Security**: helmet, express-validator
- **DevOps**: Docker, AWS, Nginx (for deployment)

## Project Structure
```
AuthForge/
├── controllers/
│   └── authController.js
├── models/
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── protectedRoutes.js
├── middleware/
│   ├── protect.js
│   └── roleGuard.js
├── utils/
│   └── tokenHelpers.js
├── config/
│   └── db.js
├── tests/
│   └── auth.test.js
├── app.js
├── server.js
├── .env
├── .gitignore
└── README.md
```

## Getting Started
### Prerequisites
- Node.js & npm
- MongoDB (local or cloud)

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/authforge
JWT_SECRET=your_jwt_secret_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
NODE_ENV=development
```

### Running the App
```bash
npm run dev   # For development (nodemon)
npm start     # For production
```

## API Endpoints
### Auth Endpoints
- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/login` — Login and receive tokens
- `POST /api/auth/logout` — Logout and revoke tokens
- `POST /api/auth/refresh` — Rotate refresh token and renew access token

### Protected Routes
- `GET /api/user/profile` — Accessible by USER, ADMIN, MODERATOR, SUPERADMIN
- `GET /api/admin/dashboard` — Accessible by ADMIN, SUPERADMIN
- `GET /api/superadmin/secret` — Accessible by SUPERADMIN only

## Security Highlights
- Passwords hashed with bcrypt
- JWT signature verification
- HTTP-only & secure cookies
- Refresh token rotation (prevents reuse attacks)
- Input validation with express-validator
- Environment-based secrets

## Role-Based Access Control (RBAC)
- Roles: USER, ADMIN, MODERATOR, SUPERADMIN
- Middleware enforces role checks on protected routes

## Token Management
| Token Type    | Purpose           | Expiry      |
|--------------|-------------------|-------------|
| Access Token | API authorization | 15 minutes  |
| Refresh Token| Session renewal   | 7 days      |

## Testing
- Unit tests in `tests/auth.test.js` (Jest & Supertest)
```bash
npm test
```

## Deployment
- Containerize with Docker
- Deploy to AWS, use Nginx for reverse proxy

## Extending AuthForge
- Add new roles in `models/User.js`
- Add new protected routes in `routes/protectedRoutes.js`
- Integrate OAuth/social login
- Multi-tenant support

## License
MIT

## Author
Your Name
