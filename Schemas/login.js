const mongoose=require("mongoose")
const schema=mongoose.Schema
const LoginSchema=new schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
})
const Login=mongoose.model("Login",LoginSchema)
module.exports=Login