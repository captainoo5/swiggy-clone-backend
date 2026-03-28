const express = require('express');
const router = express.Router();
const { createOrder, getOrder, deleteOrder } = require('../controllers/orderController');
const protectRoute = require('../middleware/auth.middleware');
const adminAuth = require('../middleware/adminMiddleware');

router.post('/create-order', protectRoute, createOrder);
router.get('/get-orders', adminAuth, getOrder);
router.delete('/delete-order/:id', adminAuth, deleteOrder);

module.exports = router;
