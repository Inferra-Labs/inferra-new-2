# Inferra Labs Website Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git

## Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=mongodb://localhost:27017/inferra-labs

# Server
PORT=3001

# JWT Secret (generate a secure random string)
JWT_SECRET=your_jwt_secret_here

# Frontend
REACT_APP_API_URL=http://localhost:3001/api
```

## Installation

1. Install main dependencies:
```bash
npm install
```

2. Install server dependencies:
```bash
cd server
npm install
cd ..
```

## Running the Application

### Development Mode

1. Start the backend server:
```bash
cd server
npm run dev
```

2. In a new terminal, start the frontend:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

### Production Mode

1. Build the frontend:
```bash
npm run build
```

2. Start the server:
```bash
cd server
npm start
```

## Database Setup

1. Make sure MongoDB is running
2. The application will automatically create the necessary collections when you first run it
3. You can seed the database with sample data by running the seed script (if available)

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the PORT in your .env file
2. **Database connection failed**: Check your DATABASE_URL and ensure MongoDB is running
3. **Missing dependencies**: Run `npm install` in both root and server directories
4. **TypeScript errors**: Ensure all type definitions are installed

### Getting Help

If you encounter any issues, check:
1. All environment variables are set correctly
2. MongoDB is running and accessible
3. All dependencies are installed
4. Node.js version is compatible
