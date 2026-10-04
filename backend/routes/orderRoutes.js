const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/placeorder', async (req, res) => {
    const { user, orderItems, shippingAddress, orderAmount } = req.body;
    try {
        const newOrder = new Order({
            user,
            orderItems,
            shippingAddress,
            orderAmount,
            status: 'pending',
            transactionId: 'dummy_txn_' + Date.now()
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

// Admin: get all orders
router.get('/all', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email phone').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
});

// Admin: update order status
router.put('/status/:id', protect, admin, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = status || order.status;
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error updating status', error });
    }
});

module.exports = router;
