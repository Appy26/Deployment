const express = require('express');
const { ProductModel } = require('../models/product.model');


const productRoute=express.Router()


productRoute.get("/get",async (req,res)=>{
    try {
        const products=await ProductModel.find()
        res.send({"data":products})
    } catch (error) {
        res.send({"msg":error.message})
    }
})


productRoute.post("/add",async (req,res)=>{
    const payload=req.body
    const{role}=payload
    try {
        if(role=="seller")
        {
            const product=new ProductModel(payload)
            product.save()
            res.send({"message":"Added Successfully"})
        }
        else 
        {
            res.send({"message":"Unauthorized Seller"})
        }
       
    } catch (error) {
        res.send({"msg":error.message})
    }
})

productRoute.delete("/delete/:id",async (req,res)=>{
  const Id=req.params.id
    try {
        await ProductModel.findByIdAndDelete({_id:Id})
        res.send({"msg":"Successfully Deleted"})   
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports={productRoute}
