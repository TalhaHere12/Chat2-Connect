const express= require('express');
const {chats} = require("./Data/data")
const dotenv=require('dotenv');
const connectDB = require('./Config/Db');
const userRoutes=require("./Routes/routes")
const chatRoutes=require("./Routes/chatRoutes")
const {notFound,errorHandler}=require('./Middleware/errorMiddleware')
const app=express();
dotenv.config();
connectDB()
app.use(express.json())  // to accept json data
app.get("/",(req,res)=>{
    res.send("API is running")
})
app.get("/api/chat",(req,res)=>{
    try {
        console.log("accessing chat api")
        res.send(chats)
    } catch (error) {
        console.log(error)
    }
})
app.get("/api/chat/:id",(req,res)=>{
    const singleChat=chats.find((c)=> c.Id==req.params.id )
    res.send(singleChat)
})
app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)
// api error handlers

app.use(notFound)
app.use(errorHandler)
const PORT= process.env.PORT || 5000;
app.listen(5000,()=>{
    console.log(`server running on port ${PORT} `)
});