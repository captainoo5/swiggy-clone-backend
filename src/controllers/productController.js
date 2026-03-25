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
};

// update product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { image, name,  restaurant, price, location, category, foodtype, description, status} = req.body;
        if (!image || !name || !restaurant || !price || !location || !category || !foodtype || !description || !status) {
            return res.status(400).json({ success: false, message: "Please provide all required fields" });
        }
        let imageUrl = image;
        if (image && !image.includes("cloudinary.com")) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        // save imagelink in database
        const updatedProduct = await Product.findByIdAndUpdate(id, {
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
        res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        console.log("Error occur in updating food:", error.message);
        res.status(500).json({ success: false, message: "Error while updating food" });
    }
};

// delete product
exports.deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        if(product.image && product.image.includes("cloudinary")){
            try {
                const publicId = product.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (error) {
                console.log("Error occur in deleting image:", error.message);
            }
        }
        await product.deleteOne();
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.log("Error occur in deleting food:", error.message);
        res.status(500).json({ success: false, message: "Error while deleting food" });
    }
};