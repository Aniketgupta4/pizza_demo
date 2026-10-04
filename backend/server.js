const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('Pizza Delivery API is running...');
});

// Import Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/pizzas', require('./routes/pizzaRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pizzahut_clone';

const seedAdminUser = async () => {
    const adminEmail = 'admin@pizza.com';
    const adminPassword = 'admin123';

    try {
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (!existingAdmin) {
            await User.create({
                name: 'Admin User',
                email: adminEmail,
                password: adminPassword,
                phone: '9999999999',
                address: 'Pizza Express HQ',
                isAdmin: true
            });
            console.log('Default admin account created: admin@pizza.com / admin123');
        }
    } catch (error) {
        console.log('Admin seeding error:', error.message);
    }
};

// DB Connection
mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected successfully');
    await seedAdminUser();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log('MongoDB connection error:', err));
