const express=require("express")
const mongoose=require("mongoose")
const bodyparse=require("body-parser")
const route=require("./Routes/route")
const cors=require("cors")
const app=express()
app.use(bodyparse.json())
app.use(cors());
app.use("/",route)
mongoose.connect("mongodb://127.0.0.1:27017")  
app.listen(3001,()=>console.log("app is running at 3001"))