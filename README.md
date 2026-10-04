# Pizza Delivery App

A full-stack pizza ordering application built with a React frontend and an Express + MongoDB backend. The app lets users browse pizzas, add items to a cart, register/login, and place orders.

## Features

- Pizza menu with category badges and pricing by size
- Add pizza items to cart with size selection
- User registration and login flow
- JWT-based authentication
- Order placement and order history support
- Responsive UI for desktop and mobile devices
- Demo data seeding for pizza catalog

## Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- CORS and dotenv

## Project Structure

```bash
pizza_demo/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── ...
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.*
├── run.bat
├── README.md
└── .gitignore
```

## Prerequisites

Before running the app, make sure you have:

- Node.js installed
- npm installed
- MongoDB running locally on `mongodb://127.0.0.1:27017`

## Setup Instructions

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `backend` folder if needed:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/pizzahut_clone
JWT_SECRET=your_secret_key
```

### 4. Start the app

You can start both services together by running:

```bash
run.bat
```

Or run them manually:

#### Backend
```bash
cd backend
npm run server
```

#### Frontend
```bash
cd frontend
npm run dev
```

Once both are running, visit:

```text
http://localhost:5173
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Pizza Catalog
- `GET /api/pizzas` - Fetch all pizzas
- `POST /api/pizzas/seed` - Seed demo pizza data

### Orders
- `POST /api/orders/placeorder` - Place an order
- `GET /api/orders/userorders/:userId` - Get user order history

## Notes

- The backend defaults to the MongoDB database name `pizzahut_clone`.
- The app includes a `Load Demo Menu` action that seeds the restaurant menu if the database is empty.
- This project is a demo pizza delivery app and can be extended with admin features, payment integration, and order tracking.

## License

This project is for learning and demo purposes.
