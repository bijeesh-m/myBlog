const User = require("../models/User");
const Blog = require("../models/Blog");


// GET PUBLIC PROFILE of a user + their blogs
module.exports.getProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const blogs = await Blog.find({ author: id, isPublished: true })
            .sort({ createdAt: -1 })
            .populate("author", "username avatar");

        res.status(200).json({ success: true, user, blogs });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// UPDATE LOGGED-IN USER'S PROFILE
module.exports.updateProfile = async (req, res) => {
    try {
        const { bio, avatar, website, username, email } = req.body;

        // Find the user first
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update only the fields that were sent
        if (bio !== undefined) user.bio = bio;
        if (avatar !== undefined) user.avatar = avatar;
        if (website !== undefined) user.website = website;
        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();

        // Return user without the password field
        const userObj = user.toObject();
        delete userObj.password;

        res.status(200).json({ success: true, user: userObj });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// GET ALL BLOGS BELONGING TO THE LOGGED-IN USER
module.exports.getMyBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user._id })
            .sort({ createdAt: -1 })
            .populate("author", "username avatar");

        res.status(200).json({ success: true, blogs });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// GET ALL USERS (admin / debug use)
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({ success: true, users });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
