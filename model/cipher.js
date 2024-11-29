const mongoose = require("mongoose");

let cipherModel = mongoose.Schema({
    firstname:String,
    lastname:String,
    plaintext: String,
    key:Number,
    encryption:String
},

{
    collection: "finalProject"
});
module.exports = mongoose.model("cipher", cipherModel)