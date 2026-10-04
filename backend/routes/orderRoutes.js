const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/placeorder', async (req, res) => {
    const { user, orderItems, shippingAddress, orderAmount } = req.body;
    try {
        const newOrder = new Order({
            user, orderItems, shippingAddress, orderAmount, transactionId: "dummy_txn_" + Date.now()
        });
        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', orderId: newOrder._id });
    } catch (error) {
        res.status(400).json({ message: 'Order failed', error });
    }
});

// Get user orders
router.get('/userorders/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(400).json({ message: 'Something went wrong', error });
    }
});

module.exports = router;
