const mongoose = require("mongoose");
const { createClient } = require('redis');
require("dotenv").config();

const connection = mongoose.connect(process.env.mongourl);

const client = createClient({
    url: process.env.redis_url
});

module.exports = {
    connection,
    client
}