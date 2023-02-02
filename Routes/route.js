const express=require("express")
const Login=require("../Schemas/login");
const Todo=require("../Schemas/todo")
const  jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt")
const route=express.Router()
const SC_KEY="MUKKOTI&&SHASHANK&&123456789"
module.exports=route
route.post("/login",async(req,res)=>{
    try{
        const Registereduser=await Login.findOne({email:req.body.email})
        if(!Registereduser){
            res.status(400).json({
                status:"error",
                message:"please Register to get login"
            })
        }else{
            bcrypt.compare(req.body.password, Registereduser.password, async function(err, result) {
                if(err){
                    res.status(400).json({
                        status:"error",
                        message:err
                    })
                }else{
                    if(result){
                        const data=await Login.findOne({email:req.body.email})
                        const token=jwt.sign({
                            data: data._id
                          }, SC_KEY, { expiresIn: 90000000 });
                        res.status(200).json({
                            status:"sucess",
                            message:"user successfully verified ",
                            token
                        })
                    }else{
                        res.status(400).json({
                            status:"error",
                            message:"incorrect password"
                        })

                    }
                }
            });
        }
        
    }catch{

    }
})
route.post("/register",async(req,res)=>{
    try{
        
        const Registereduser=await Login.findOne({email:req.body.email})
        //checking user is existed or not
        if(!Registereduser){
            try{
                
                bcrypt.hash(req.body.password, 10, async function(err, hash) {
                    if(err){
                        res.status(400).json({
                            status:"error",
                            message:err  
                        })
                    }else{
                        await Login.create({email:req.body.email,password:hash})
                        res.status(200).json({
                            status:"sucess",
                            message:"sucessfully registered, please login"
                            
                        })
                    }
                });  

            }
            catch(err){
                res.status(400).json({
                    status:"error",
                    message:err.message
                })
            }

        }else{
            res.status(400).json({
                status:"error",
                message:"user already registered, you can login directly"
            })
        }

    }
    catch(err){
        
        res.status(400).json({
            status:"error",
            message:err.message
        })

    }

})
route.get("/home",async(req,res)=>{
    try{
        jwt.verify(req.headers.authorization, SC_KEY, async function(err, decoded) {
            if(err){
                res.status(400).json({
                    status:"error",
                    message:"token must be provided"  
                })
            }else{
                const data=await Login.findOne({_id:decoded.data})
                if(data){
                const datax=await Todo.find({id:data._id})
                res.status(200).json({
                    status:"sucess",
                    data:datax
                })}
                else{
                    res.status(400).json({
                        status:"error",
                        message:"token verification not verified"
                    })
                }

            }
          });
        
        
    }catch(err){
        res.status(400).json({
            status:"error",
            message:err
        })
    }
})
route.post("/home",async(req,res)=>{
    try{
        jwt.verify(req.headers.authorization, SC_KEY, async function(err, decoded) {
            if(err){
                res.status(400).json({
                    status:"error",
                    message:err
                })
            }else{
                
                const data=await Login.findOne({_id:decoded.data})
                if(data){
                await Todo.create({...req.body,id:data._id})
                res.status(200).json({
                    status:"sucess",
                    message:"task added for completion please focus on this"
                })}
                else{
                    res.status(400).json({
                        status:"error",
                        message:"token verification not verified"
                    })
                }

            }
          });
        
        

    }catch(err){
        res.status(400).json({
            status:"error",
            message:err
        })
    }
})
route.put("/home/:id",async(req,res)=>{
    try{
        jwt.verify(req.headers.authorization, SC_KEY, async function(err, decoded) {
            if(err){
                res.status(400).json({
                    status:"error",
                    message:err
                })
            }else{
                const data=await Login.findOne({_id:decoded.data})
                if(data){
                await Todo.updateOne({_id:req.params.id},req.body)
                res.status(200).json({
                    status:"sucess",
                    message:"updated"
                })}
                else{
                    res.status(400).json({
                        status:"error",
                        message:"token verification not verified"
                    })
                }
            }
          });
    }catch(err){
        res.status(400).json({
            status:"error",
            message:err
        })
    }
})