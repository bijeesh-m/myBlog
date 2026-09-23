const Blog = require("../models/Blog")



module.exports.createBlog = async (req, res) => {
    try {

        const newBlog = await Blog.create({ ...req.body, tags: req.body.tags.split(",") })
        res.status(201).json({ success: true, message: "Blog created successfully!" })

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}

module.exports.getAllBlogs = async (req, res) => {
    try {

        const blogs = await Blog.find()
        res.status(200).json({ success: true, blogs })

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}


