

const blogController = require("../controllers/blogController")

const express = require("express")


const router = express.Router()


router.post("/blogs", blogController.createBlog)
router.get("/blogs", blogController.getAllBlogs)
router.get("/blogs/:id", blogController.getSingleBlog)
router.put("/blogs/:id", blogController.updateBlog)
router.delete("/blogs/:id", blogController.deleteBlog)



module.exports = router