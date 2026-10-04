const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza');

// Get all pizzas
router.get('/', async (req, res) => {
    try {
        const pizzas = await Pizza.find({});
        res.json(pizzas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add dummy pizza data route (for initial seed)
router.post('/seed', async (req, res) => {
    const dummyPizzas = [
        {
            name: "Margherita",
            varients: ["small", "medium", "large"],
            prices: [{ small: 200, medium: 350, large: 400 }],
            category: "veg",
            image: "https://www.crazymasala.com/wp-content/uploads/2023/07/margherita-pizza.jpg",
            description: "Classic delight with 100% real mozzarella cheese"
        },
        {
            name: "Farmhouse",
            varients: ["small", "medium", "large"],
            prices: [{ small: 250, medium: 400, large: 500 }],
            category: "veg",
            image: "https://www.dominos.co.in/files/items/Farmhouse.jpg",
            description: "Delightful combination of onion, capsicum, tomato & grilled mushroom"
        },
        {
            name: "Pepper Barbecue Chicken",
            varients: ["small", "medium", "large"],
            prices: [{ small: 300, medium: 450, large: 550 }],
            category: "nonveg",
            image: "https://www.dominos.co.in/files/items/Pepper_Barbeque.jpg",
            description: "Pepper barbecue chicken for that extra zing"
        }
    ];
    try {
        await Pizza.deleteMany({});
        const seededPizzas = await Pizza.insertMany(dummyPizzas);
        res.status(201).json(seededPizzas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
