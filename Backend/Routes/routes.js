const express=require('express')
const {registerUser,authUser,allUsers}=require("../Controllers/userController")
const {protect}=require('../Middleware/authMiddleware')


const router=express.Router();

router.route("/").post(registerUser)
router.post("/login",authUser)
router.route("/").get(protect,allUsers)

module.exports=router;