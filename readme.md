# Com Project REST API

A simple and secure e-commerce RESTful API built with Node.js, Express, and PostgreSQL. This API provides endpoints for user management, product catalog, and order processing.

## Features

- 🔐 Secure authentication with JWT
- 📦 Product management
- 🛒 Order processing
- 👤 User management
- 📝 API documentation with Swagger
- 🛡️ Security features (Helmet, Rate Limiting)
- 📊 PostgreSQL database with Prisma ORM

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT for authentication
- Swagger for API documentation
- Express Validator for request validation
- Helmet for security headers
- Rate limiting for API protection

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
cd com-project
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5879
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/com_db"

# JWT Configuration
JWT_SECRET=your_secret_here
JWT_SECRET_ISSUER=localhost
JWT_SECRET_AUDIENCE=localhost
JWT_SECRET_EXPIRES_IN=7d

# Swagger
SWAGGER_SERVER_URL

```

4. Set up the database:

```bash
# Run database migrations
npm run migrate

# Seed the database with initial data
npm run seed
```

5. Start the server:

```bash
# Development mode
npm run start:dev

# Production mode
npm start
```

The server will start on http://localhost:5879 (or the port specified in your .env file)

## API Documentation

Once the server is running, you can access the Swagger documentation at:

```
http://localhost:5879/api-docs
```

## Project Structure

```
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middlewares/    # Custom middlewares
├── models/         # Data models
├── prisma/         # Prisma schema and migrations
├── routes/         # API routes
├── swagger/        # API documentation
├── utils/          # Utility functions
├── server.js       # Application entry point
└── package.json    # Project dependencies
```

## API Endpoints

The API provides the following main endpoints:

- `/api/auth` - Authentication endpoints
- `/api/products` - Product management
- `/api/orders` - Order processing
- `/api/users` - User management

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting to prevent abuse
- Helmet for security headers
- CORS protection
- Input validation

## Development

To run the project in development mode with hot-reload:

```bash
npm run dev
```

## Database Migrations

To create a new migration after modifying the Prisma schema:

```bash
npm run migrate
```

## License

ISC
