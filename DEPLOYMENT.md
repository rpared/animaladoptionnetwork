# Deployment Guide for Animal Adoption Network

This guide provides instructions on how to deploy the Animal Adoption Network application.

## Prerequisites

Before deploying the application, ensure you have the following prerequisites:

- Node.js (version 18.x or later)
- npm (version 6.x or later)
- MongoDB Atlas account (or any MongoDB instance)
- Vercel account (optional for deployment)

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/animal-adoption-network.git
   cd animal-adoption-network

2. **Install Dependencies**
   npm install

3. **Environment Variables**
Create a .env.local file in the root directory and add the following environment variables:
MONGODB_URI: Your MongoDB connection string.
NEXT_PUBLIC_API_URL: The base URL for your API.
JWT_SECRET: A secret key for JWT authentication.

4. **Run the Application Locally**
npm run dev

Open your browser and navigate to http://localhost:3000 to see the application running locally.