const epxress = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { SearchModel } = require("../models/searches.model");
const { client } = require("../db");

const weatherRoute = epxress.Router();

weatherRoute.post("/", async (req,res)=>{

    const {email, city} = req.body;
    let cache = await client.exists(`${city}`);

    if(cache){
        let data = await client.get(`${city}`);
        res.send(data);
        return;
    }

    const request = await fetch(`http://api.weatherstack.com/current?access_key=${process.env.key}&query=${city}`)
    const response = await request.json();
    let check = await SearchModel.find({email});

    if(check.length > 0){
        let arr = check[0].searches;
        arr.push(response);
        await SearchModel.updateOne({email}, {search_history:arr});

    } else {
        let arr = [];
        arr.push(response);
        let data = new SearchModel({email, search_history: arr})
        await data.save();
    }

    await client.set(`${city}`, JSON.stringify(response));
    await client.expire(`${city}`, 60*30);
    res.send(response);
})

module.exports = {
    weatherRoute
}