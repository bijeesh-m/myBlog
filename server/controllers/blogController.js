const Blog = require("../models/Blog")


// Helper: compute read time (words / 200 wpm)
const computeReadTime = (content) => {
    if (!content) return 1;
    const words = content.trim().split(" ").length;
    const minutes = Math.ceil(words / 200);
    return minutes < 1 ? 1 : minutes;
}

// Helper: generate a short excerpt from content
const makeExcerpt = (content) => {
    if (!content) return "";
    const plain = content.replace(/[#*>`\[\]]/g, "").trim();
    if (plain.length > 160) {
        return plain.substring(0, 160) + "...";
    }
    return plain;
}


// CREATE BLOG
module.exports.createBlog = async (req, res) => {
    try {
        const { title, content, category, image, tags, isPublished } = req.body;

        // Convert tags string to array
        let tagsArr = [];
        if (tags && typeof tags === "string") {
            tagsArr = tags.split(",");
            for (let i = 0; i < tagsArr.length; i++) {
                tagsArr[i] = tagsArr[i].trim();
            }
        }

        const readTime = computeReadTime(content);
        const excerpt = makeExcerpt(content);

        const published = isPublished !== undefined ? isPublished : true;

        const newBlog = await Blog.create({
            title,
            content,
            excerpt,
            author: req.user._id,
            category,
            image,
            tags: tagsArr,
            isPublished: published,
            readTime,
        });

        await newBlog.populate("author", "username avatar bio");

        res.status(201).json({ success: true, message: "Blog created successfully!", blog: newBlog });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// GET ALL BLOGS (with optional search, category, author, pagination)
module.exports.getAllBlogs = async (req, res) => {
    try {
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.limit ? Number(req.query.limit) : 10;
        const skip = (page - 1) * limit;
        const category = req.query.category;
        const search = req.query.search;
        const author = req.query.author;

        // Build filter object step by step
        const filter = {};
        filter.isPublished = true;

        if (category && category !== "all") {
            filter.category = { $regex: category, $options: "i" };
        }

        if (author) {
            filter.author = author;
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } },
                { tags: { $regex: search, $options: "i" } },
            ];
        }

        // Fetch blogs first, then count separately
        const blogs = await Blog.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("author", "username avatar bio");

        const total = await Blog.countDocuments(filter);

        const pages = Math.ceil(total / limit);

        res.status(200).json({
            success: true,
            blogs,
            pagination: {
                total,
                page,
                limit,
                pages,
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// GET SINGLE BLOG (also increments view count)
module.exports.getSingleBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id).populate("author", "username avatar bio website");

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found!" });
        }

        // Increment views
        blog.views = blog.views + 1;
        await blog.save();

        res.status(200).json({ success: true, blog });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// UPDATE BLOG (only by the author)
module.exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // Check ownership
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to edit this blog" });
        }

        const { title, content, image, category, tags, isPublished } = req.body;

        // Update fields only if provided
        if (title) blog.title = title;
        if (image !== undefined) blog.image = image;
        if (category) blog.category = category;
        if (isPublished !== undefined) blog.isPublished = isPublished;

        if (content) {
            blog.content = content;
            blog.readTime = computeReadTime(content);
            blog.excerpt = makeExcerpt(content);
        }

        if (tags !== undefined) {
            if (typeof tags === "string") {
                const tagsArr = tags.split(",");
                for (let i = 0; i < tagsArr.length; i++) {
                    tagsArr[i] = tagsArr[i].trim();
                }
                blog.tags = tagsArr;
            } else {
                blog.tags = tags;
            }
        }

        await blog.save();
        await blog.populate("author", "username avatar bio");

        res.status(200).json({ success: true, message: "Blog updated!", blog });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// DELETE BLOG (only by the author)
module.exports.deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // Check ownership
        if (blog.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to delete this blog" });
        }

        await Blog.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Blog deleted successfully!" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// LIKE / UNLIKE BLOG
module.exports.likeBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id.toString();

        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // Check if user already liked this blog
        let alreadyLiked = false;
        for (let i = 0; i < blog.likes.length; i++) {
            if (blog.likes[i].toString() === userId) {
                alreadyLiked = true;
                break;
            }
        }

        if (alreadyLiked) {
            // Remove the like
            const newLikes = [];
            for (let i = 0; i < blog.likes.length; i++) {
                if (blog.likes[i].toString() !== userId) {
                    newLikes.push(blog.likes[i]);
                }
            }
            blog.likes = newLikes;
        } else {
            // Add the like
            blog.likes.push(req.user._id);
        }

        await blog.save();

        res.status(200).json({
            success: true,
            liked: !alreadyLiked,
            likesCount: blog.likes.length,
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// GET FEATURED BLOGS (most viewed)
module.exports.getFeaturedBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })
            .sort({ views: -1 })
            .limit(6)
            .populate("author", "username avatar");

        res.status(200).json({ success: true, blogs });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// GET ALL DISTINCT CATEGORIES
module.exports.getCategories = async (req, res) => {
    try {
        const categories = await Blog.distinct("category", { isPublished: true });

        res.status(200).json({ success: true, categories });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
