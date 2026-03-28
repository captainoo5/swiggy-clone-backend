const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminMiddleware');

router.get('/dashboard-stats', adminAuth, adminController.getDashboardStats);

module.exports = router;
