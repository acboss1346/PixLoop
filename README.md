# PixLoop 📸

A full-stack, modern image-sharing platform built with React, Node.js, Express, and MySQL.

## Features

- **Authentication**: JWT-based secure login and registration.
- **Image Sharing**: Upload photos to your feed (powered by Cloudinary).
- **Interactions**: Like and comment on posts.
- **Modern UI**: Clean, Instagram-lite aesthetics with responsive design.
- **Full-Stack Separated Architecture**: Ready to be deployed independently.

---

## Project Structure

This repository is split into two deployable parts:

- `/backend`: Node.js + Express API + MySQL.
- `/frontend`: React + Vite + Tailwind CSS frontend.

---

## Setup & Running Locally

### 1. Database Setup
Ensure you have MySQL installed and running locally.
```bash
cd backend
npm install
# Create a .env file (see below)
# Initialize the database schema:
npm run db:init
```

### 2. Environment Variables
Create a `.env` file in the `backend` directory based on the provided template:

```env
PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=pixloop
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Run the Backend
```bash
cd backend
npm start
# OR for development:
npm run dev
```

### 4. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` to view the app!

---

## Deployment Ready

- **Backend**: Can be deployed directly to Railway, Render, or Heroku. The `package.json` contains a `start` script.
- **Frontend**: Can be deployed seamlessly to Vercel or Netlify. The `package.json` contains a `build` script. Just remember to set the `VITE_API_URL` environment variable on Vercel to point to your live backend URL (e.g., `https://pixloop-backend.onrender.com/api`).
# Pixloop
