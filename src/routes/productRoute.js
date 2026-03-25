const express = require('express');
const adminController = require('../controllers/adminController');
const adminAuth = require('../middleware/adminMiddleware');

const router = express.Router();

router.post('/admin/add-product', adminAuth, adminController.addProduct);
router.get('/admin/get-all-products', adminAuth, adminController.getAllProducts);

module.exports = router;