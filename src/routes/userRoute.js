const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const adminAuth = require('../middleware/adminMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/get-users', adminAuth, userController.getUsers);
router.delete('/delete-user/:id', adminAuth, userController.deleteUser);
router.put('/update-user/:id', adminAuth, userController.updateUser);


module.exports = router;