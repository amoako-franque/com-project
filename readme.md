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
- 🐳 Docker support for easy deployment

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
- Docker & Docker Compose

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

## Setup Instructions

### Option 1: Local Development Setup

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
SWAGGER_SERVER_URL=http://localhost:5879

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

### Option 2: Docker Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd com-project
```

2. Create a `.env` file in the root directory (same as above)
3. Build and start the containers:

```bash
# Build and start all services
docker compose up --build

# Run in detached mode
docker compose up -d

# Stop the containers
docker compose down
```

The application will be available at:

- API: http://localhost:5879
- Swagger Documentation: http://localhost:5879/api-docs
- PostgreSQL Database: localhost:5432

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
├── Dockerfile      # Docker configuration
├── docker-compose.yml # Docker Compose configuration
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

## Docker Commands

Useful Docker commands for development:

```bash
# View running containers
docker compose ps

# View logs
docker compose logs -f

# Rebuild a specific service
docker compose up -d --build app

# Access container shell
docker compose exec app sh

# Access database shell
docker compose exec db psql -U postgres
```

## License

ISC
