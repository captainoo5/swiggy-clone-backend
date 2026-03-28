const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, number, password } = req.body;

        // Validation
        if (!name || !email || !number || !password) {
            return res.status(400).json({ success: false, message: "Please provide all required fields", data: {} });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists with this email", data: {} });
        }

        const newUser = new User({ name, email, number, password });
        await newUser.save();

        const token = generateToken(newUser._id);
        
        res.status(201).json({
            success: true,
            message: "New user created successfully",
            data: {
                token,
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    number: newUser.number
                }
            }
        });
        console.log("New user created");
    } catch (error) {
        console.log("Error occur in registration:", error.message);
        res.status(500).json({ success: false, message: "Error while registrating new user", data: {} });
    }
};

exports.loginUser = async (req, res) => {
    try {
       
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide email and password" });
        }

        // checking user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found", data: {} });
        }

        // checking password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials", data: {} });
        }

        const token = generateToken(user._id);
        const loginMessage = user.role === "admin" ? "logged as admin" : "User logged in successfully";
        res.status(200).json({
            success: true,
            message: loginMessage,
            data: {
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    number: user.number,
                    role: user.role
                }
            }
        });
        console.log(loginMessage);
    } catch (error) {
        console.log("Error occur in login:", error.message);
        res.status(500).json({ success: false, message: "Error while logging in"});
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: {
                users
            }
        });
    } catch (error) {
        console.log("Error occur in fetching users:", error.message);
        res.status(500).json({ success: false, message: "Error while fetching users"});
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if(!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully"
        });
    } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
