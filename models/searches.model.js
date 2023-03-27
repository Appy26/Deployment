const mongoose = require("mongoose");

const searchSchema = mongoose.Schema({
    email:String,
    search_history:Array
})

const SearchModel = mongoose.model("search", searchSchema);

module.exports = {
    SearchModel
}