var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khoapham:Tch4sFMATHUIbSAh@cluster0.zqn70.mongodb.net/Covid?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        console.log("Mongoose error: " + err);
    }else{
        console.log("Mongoose connected successfully.");
    }
});

// Config
var domain = null;
var bgColor = null;

LoadConfigData("./config/server.json");

function LoadConfigData(file){
    var obj;
    fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err;
        obj = JSON.parse(data);
        domain = obj.domain;
        bgColor = obj.bgColor;
    });
}

io.on("connection",function(socket){
    console.log("New connection " + socket.id);
});

app.get("/", function(req, res){
    res.render("home/default", {domain:domain});
});
