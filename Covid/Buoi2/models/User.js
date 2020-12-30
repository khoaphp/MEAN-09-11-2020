const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Email:      String,
    Password:   String, 

    Image:      String,
    Name:       String,
    Adress:     String,
    City:       Number,
    District:   Number,
    Ward:       Number,
    Phone:      String,

    RandomString: String, 
    Active:     Boolean,
    
    RegisterDate:Date
});

module.exports = mongoose.model("User", userSchema);