@echo off
echo Starting Pizza Delivery App...
echo Make sure MongoDB is running on your machine (mongodb://127.0.0.1:27017)

echo Starting Backend...
start cmd /k "cd backend && npm run server"

echo Starting Frontend...
start cmd /k "cd frontend && npm run dev"

echo Both servers are starting. You can access the app at http://localhost:5173
