const mongoose = require("mongoose");

const cap2Schema = new mongoose.Schema({
    Title: String,
});

module.exports = mongoose.model("Cap2", cap2Schema);