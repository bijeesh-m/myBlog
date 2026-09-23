



const blogController = require("../controllers/blogController")

const express = require("express")


const router = express.Router()


router.post("/blogs", blogController.createBlog)
router.get("/blogs", blogController.getAllBlogs)



module.exports = router