const Order = require('../models/orderModel');


exports.createOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { items, amountDetails, deliveryAddress } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: "No items in order" });
        }

        const newOrder = new Order({
            user: userId,
            items,
            amountDetails,
            deliveryAddress
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            success: true,
            orderId: savedOrder._id,
            message: "Order placed successfully"
        });
    } catch (error) {
        console.error("Error creating order:", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.error("Error fetching orders:", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);
        if(!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting order:", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};