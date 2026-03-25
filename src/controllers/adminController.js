const Product = require('../models/productModel');
const cloudinary = require('../lib/cloudinary');

exports.addProduct = async (req, res) => {
    try {
        const { image, name,  restaurant, price, location, category, foodtype, description, status} = req.body;
        if (!image || !name || !restaurant || !price || !location || !category || !foodtype || !description || !status) {
            return res.status(400).json({ success: false, message: "Please provide all required fields" });
        }
        // upload Image to cloudinary 
        const uploadResponse = await cloudinary.uploader.upload(image);
        const imageUrl = uploadResponse.secure_url;

        // save imagelink in database
        const newProduct = new Product({
             image: imageUrl,
             name: name,
             restaurant: restaurant,
             price: price,
             location: location,
             category: category,
             foodtype: foodtype,
             description: description,
             status: status 
            });
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product added successfully", data: newProduct });
    } catch (error) {
        console.log("Error occur in adding food:", error.message);
        res.status(500).json({ success: false, message: "Error while adding food" });
    }
};

// get all products
exports.getAllProducts = async (req, res) => {
    try {
        //pagination => infinite loading
        const page = req.query.page || 1;
        const limit = req.query.limit || 6;
        const skip = (page - 1)* limit;


        const products = await Product.find()
        .sort({createdAt: -1})// sorting is desc order
        .skip(skip)
        .limit(limit)

        const totalProducts = await Product.countDocuments();
        res.status(200).json({ success: true, data: products, total: totalProducts });
    } catch (error) {
        console.log("Error occur in getting products:", error.message);
        res.status(500).json({ success: false, message: "Error while getting products" });
    }
}
