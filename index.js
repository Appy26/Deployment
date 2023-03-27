const express = require("express");
const cookieParser = require('cookie-parser');
const { userRoute } = require("./routes/user.routes");
const { connection, client } = require("./db");
const { authorization } = require('./middleware/authenticate.middleware');
const { weatherRoute } = require('./routes/wheather.routes');
const { validation } = require("./middleware/validation.middleware");
require("dotenv").config();
require('winston-mongodb');



var expressWinston = require('express-winston');
var winston = require('winston');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(expressWinston.logger({
    transports: [
        
        new winston.transports.MongoDB({
         level:"info",
            db: process.env.mongourl,
            json:true
        })
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));



app.use("/user", userRoute);

app.use(authorization);
app.use(validation);

app.use("/weather", weatherRoute);


client.on('error', err => console.log('Redis Client Error', err));

app.listen(process.env.PORT, async ()=>{
    try {
        await connection;
        console.log("MongoDB connected");
        await client.connect();
        console.log("Redis connected");
    } catch (error) {
        console.log(error);
        console.log("Something went rong with Database connection");
    }
    console.log(`Server running at port ${process.env.PORT}`);
})