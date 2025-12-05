# Quick Setup Guide

## Prerequisites
- Node.js (v16+)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Step-by-Step Setup

### 1. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Windows: copy .env.example .env
# Mac/Linux: cp .env.example .env

# Edit .env file with your MongoDB URI
# For local MongoDB: mongodb://localhost:27017/noteflow
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/noteflow

# Start the server
npm run dev  # Development mode with auto-reload
# OR
npm start    # Production mode
```

### 2. Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
# Windows: copy .env.example .env
# Mac/Linux: cp .env.example .env

# Edit .env file - set VITE_API_URL to your backend URL
# For local: VITE_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

### 3. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### 4. Create Your First Account

1. Open http://localhost:3000
2. Click "Sign up"
3. Fill in your details (name, email, password)
4. Start creating notes!

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally, OR
- Check your MongoDB Atlas connection string
- Verify network access in MongoDB Atlas if using cloud

### Port Already in Use
- Backend: Change PORT in server/.env
- Frontend: Change port in client/vite.config.js

### CORS Errors
- Ensure backend CORS is configured (already done)
- Check that VITE_API_URL matches your backend URL

### Build Errors
- Delete node_modules and package-lock.json
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## Production Build

### Backend
```bash
cd server
npm start
```

### Frontend
```bash
cd client
npm run build
# Output will be in client/dist directory
```

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_minimum_32_characters
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
```

