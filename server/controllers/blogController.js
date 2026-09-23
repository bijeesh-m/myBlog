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

module.exports.getSingleBlog = async (req, res) => {

    try {
        const { id } = req.params
        console.log(id);
        
        const blog = await Blog.findById(id)
        if (blog) {
            res.status(200).json({ success: true, blog })
        } else {
            res.status(404).json({ success: false, message: "Blog not found!" })
        }
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: error.message, success: false })
    }
}

module.exports.updateBlog = async (req, res) => {
    try {

        const { title, author, image, content, category, tags, isPublished } = req.body

        const { id } = req.params
        const updatedBlog = await Blog.findByIdAndUpdate(id, {
            $set: {
                title: title && title,
                author: author && author,
                image: image && image,
                content: content && content,
                category: category && category,
                tags: tags && tags,
                isPublished: isPublished && isPublished,
            }
        })

        res.status(200).json({ success: true, message: "Blog updated!" })

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}
module.exports.deleteBlog = async (req, res) => {
    try {

        const { id } = req.params
        await Blog.findByIdAndDelete(id)
        res.status(200).json({ success: false, message: "Blog deleted successfully!" })

    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}






