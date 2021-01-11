const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Email:      String,
    Password:   String, 

    Image:      String,
    Name:       String,
    Address:    String,
    City:       String,
    District:   String,
    Ward:       String,
    Phone:      String,

    RandomString: String, 
    Active:     Boolean,
    
    RegisterDate:Date
});

module.exports = mongoose.model("User", userSchema);