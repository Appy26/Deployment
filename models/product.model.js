const mongoose = require('mongoose');

const ProductSchema=mongoose.Schema({
    name:String,
    price:Number,
    rating:Number
})

const ProductModel=mongoose.model("Product",ProductSchema)

module.exports={ProductModel}
