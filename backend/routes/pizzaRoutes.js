const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all pizzas
router.get('/', async (req, res) => {
    try {
        const pizzas = await Pizza.find({});
        res.json(pizzas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin: add pizza
router.post('/', protect, admin, async (req, res) => {
    try {
        const { name, varients, prices, category, image, description } = req.body;

        if (!name || !varients || !prices || !category || !image || !description) {
            return res.status(400).json({ message: 'Please provide all pizza details' });
        }

        const pizza = await Pizza.create({
            name,
            varients,
            prices,
            category,
            image,
            description
        });

        res.status(201).json(pizza);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin: update pizza
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id);
        if (!pizza) return res.status(404).json({ message: 'Pizza not found' });

        const updatedPizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPizza);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin: delete pizza
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id);
        if (!pizza) return res.status(404).json({ message: 'Pizza not found' });

        await pizza.deleteOne();
        res.json({ message: 'Pizza deleted successfully' });
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
