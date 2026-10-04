const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [],
    shippingAddress: { type: Object },
    orderAmount: { type: Number, required: true },
    isDelivered: { type: Boolean, default: false },
    transactionId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
