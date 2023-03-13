const express = require('express');
const jwt = require('jsonwebtoken');
const {blacklist}=require("../blacklist")


const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    try {
      if(blacklist.includes(token))
      {
        res.send({"msg":"Please Login again session expired"})
      }
      else{
        jwt.verify(token, 'user', function(err, decoded) {
            console.log(decoded)
            req.body.role=decoded.role
            if(decoded){
                next()
            }else{
                res.send({"msg":"please login"})
            }
          });
      }
    } catch (error) {
        res.send({"msg":error.message})
    }
}

module.exports={authenticate}
