const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    Token:String,
    Active:Boolean,  // true còn hiệu lực, false !
    User: mongoose.SchemaTypes.ObjectId,
    LoginDate:Date
});

module.exports = mongoose.model("Token", tokenSchema);