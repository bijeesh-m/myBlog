
const express = require("express");
const User = require("../models/User");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router()

router.get("/users", protect, async(req,res)=>{
    try{
      const users = await User.find()
      res.status(200).json({message:"Success", users})
    }catch(error){
     res.status(500).json({message:false , error})
    }
})

module.exports = router;