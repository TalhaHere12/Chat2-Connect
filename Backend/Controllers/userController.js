const asyncHandler=require('express-async-handler')
const User=require("../Models/userModel")
const generateToken=require('../Config/generateToken')
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password,pic}=req.body;
    if(!name||!email||!password){
        res.status(400)
        throw new Error("please enter all the fields")
    }
    const userExists=await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("USer already exists")
    }
    const user=await User.create({
        name,
        email,
        password,
        pic
    })
    if(user){
        res.status(201).json({
            Id:user.Id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user.Id)
        })
    }else{
        res.status(400)
        throw new Error("failed to create the user")
    }
})

const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email})

    if(user && (await user.matchPassword(password)) ){
        res.json({
            Id:user.Id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user.Id)

        })
    }
})
// api/user/?search=talha
const allUsers=asyncHandler(async(req,res)=>{
    const keyword=req.query.search?{
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}}
        ]
    }:{};

    const users=await User.find(keyword)
    res.send(users)

    console.log(keyword)
})

module.exports={registerUser,authUser,allUsers}