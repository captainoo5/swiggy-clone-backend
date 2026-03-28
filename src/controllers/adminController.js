const User = require('../models/userModel');
const Order = require('../models/orderModel');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalOrders = await Order.countDocuments();
        
        // Calculate total sales from delivered orders
        const orders = await Order.find({ status: 'Delivered' });
        const totalSales = orders.reduce((acc, order) => acc + order.amountDetails.grandTotal, 0);

        // Get recent transactions (latest 5 orders)
        const recentTransactions = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('user', 'name email');

        // Simple sales breakdown (mocking based on categories for now or just static for UI)
        // In a real app, this would be aggregated from items
        const salesBreakdown = [
            { name: "Cloud Kitchens", pct: "42%", w: "w-[42%]", color: "bg-[#FF5200]", textColor: "text-[#FF5200]" },
            { name: "Premium Dining", pct: "35%", w: "w-[35%]", color: "bg-purple-500", textColor: "text-purple-500" },
            { name: "Instamart Hubs", pct: "23%", w: "w-[23%]", color: "bg-blue-500", textColor: "text-blue-500" },
        ];

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalOrders,
                totalSales,
                recentTransactions,
                salesBreakdown
            }
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
