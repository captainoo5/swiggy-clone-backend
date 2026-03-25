const express = require('express');
const {
    addProduct,
    getAllProducts, 
    updateProduct, 
    deleteProduct
} = require('../controllers/productController');
const adminAuth = require('../middleware/adminMiddleware');
const protectRoute = require('../middleware/auth.middleware');


const router = express.Router();

router.post('/admin/add-product', adminAuth, addProduct);
router.get('/admin/get-all-products', adminAuth, getAllProducts);
//for user/guest
router.get('/get-all-products', getAllProducts);
router.put('/admin/update-product/:id', adminAuth, updateProduct);
router.delete('/admin/delete-product/:id', adminAuth, deleteProduct);

module.exports = router;