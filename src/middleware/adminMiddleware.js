const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        if (user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Forbidden" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error occur in admin middleware:", error.message);
        res.status(500).json({ success: false, message: "Error while checking admin access", data: {} });
    }
};

module.exports = adminAuth;