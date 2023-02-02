const mongoose=require("mongoose")
const schema=mongoose.Schema
const TodoSchema=new schema({
    id:{type:String},
    activity:{type:String},
    status:{type:String},
    timetaken:{type:String}
})
const Todo=mongoose.model("Todo",TodoSchema)
module.exports=Todo