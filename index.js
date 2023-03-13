const express = require('express');
require("dotenv").config()
const {connection }=require("./configs/db");
const { userRoute } = require('./routes/user.route');
const{authenticate}=require("./middlewares/authenticate");
const { productRoute } = require('./routes/product.route');


const app=express()

app.use(express.json())

app.use("/user",userRoute)
app.use(authenticate)
app.use("/product",productRoute)


app.listen(process.env.port,async ()=>{
    await connection
    console.log("connected to DB")
    console.log("Runnning at 8080")
})
