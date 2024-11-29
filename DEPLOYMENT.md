# Deployment Guide for Animal Adoption Network
This guide provides step-by-step instructions for deploying the Animal Adoption Network application.

## Prerequisites
Before you begin, ensure you have the following:

- Node.js and npm installed
- MongoDB Atlas account or a MongoDB server
- Optional: Vercel account for deployment

## Step 1: Clone the Repository
Clone the repository to your local machine and change the pwd to the corresponding directory:

```bash
git clone https://github.com/yourusername/animal-adoption-network.git
cd animal-adoption-network
```

## Step 2: Install Dependencies
```bash
npm install
```

## Step 3: Configure Environment Variables
Create a .env.local file in the root directory of your project and add the following environment variables:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

Replace your_mongodb_connection_string, your_jwt_secret, and your_google_maps_api_key with your actual values.

## Step 4: Run the Application Locally
To ensure everything is set up correctly, run the application locally:
```bash
npm run dev
```

Open your browser and navigate to http://localhost:3000, or the specified port, to experience the application running.

## Step 6: To upload to a repository create a .gitignore file with dependencies and environment variables.