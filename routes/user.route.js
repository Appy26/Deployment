const express = require('express');
const{UserModel}=require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{blacklist}=require("../blacklist")

const userRoute=express.Router()


userRoute.post("/register" ,async(req,res)=>{
    const payload=req.body
    try {
        const isPresent=await UserModel.findOne({email:payload.email})
        if(isPresent){
            res.send({"msg":"Already registerd please login"})
        }else{
         bcrypt.hash(payload.password, 5, function(err, hash) {
            if(err){
                res.send({"msg":"Enter valid credentials"})
            }else{
                const user=new UserModel({email:payload.email,password:hash,role:payload.role})
             user.save()
             res.send({"msg":"registered succesfully"})
            }
        });
         }
    } catch (error) {
        res.send({"msg":error.message})
    }
    })

    
    userRoute.post("/login",async(req,res)=>{
try {
    const {email,password,role}=req.body
    const user=await UserModel.find({email})
    if(user.length>0){
        bcrypt.compare(password, user[0].password, function(err, result) {
            if(result){
                const token=jwt.sign({ role:role }, 'user',{expiresIn:"1min"});
                const reftoken=jwt.sign({ role:role }, 'user',{expiresIn:"5min"});
                res.send({"msg":"successfully logged in","token":token,"reftoken":reftoken})
            }else{
                res.send({"msg":"please enter correct password"})
            }
        });
    }
    else{
        res.send({"msg":"please enter correct email"})
    }
} catch (error) {
    res.send({"msg":error.message})
}
    })



userRoute.post("/logout",(req,res)=>{
    blacklist.push(req.headers.authorization)
    console.log(blacklist)
    res.send("logged out")
})
    module.exports={userRoute}
