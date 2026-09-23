const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        image: String,
        tags: [String],
        isPublished: {
            type: Boolean,
            required: true
        },
    },
    {
        timestamps: true
    }
)
const Blog = mongoose.model("blogs", blogSchema);
module.exports = Blog