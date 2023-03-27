const epxress = require("express");
const jwt = require("jsonwebtoken");
const { client } = require("../db");
const { UserModel } = require("../models/user.model");

const userRoute = epxress.Router();

userRoute.post("/register", async(req,res)=>{
    try {
        let data = new UserModel(req.body);
        await data.save()
        res.send({ "msg":"registred"});
    } catch (error) {
        console.log(error);
        res.status(400).send({"ok":false, "msg":"Invalid Input"})
    }
})

userRoute.post("/login", async (req,res)=>{
    try {
        let {email, pass} = req.body;
        let check = await UserModel.find({email,pass});

        if(check.length > 0){
            const token = jwt.sign({ email: check[0].email }, 'token');
            res.cookie("token", token);
            res.send({ "msg":"Logged successfully"});
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({"msg":"Invalid Input"})
    }
})

userRoute.get("/logout", async (req,res)=>{
    try {
        await client.set(`${req.email}`, `${req.cookies.token}`);
        res.clearCookie("token");
        res.send({"ok":true, "msg":"User Logged Out successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).send({ "msg":"Invalid Input"})
    }
})

module.exports = {
    userRoute
}