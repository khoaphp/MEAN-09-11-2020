var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://khoapham:BeQ9Z9ekdVK4pmQe@cluster0.eg2n2.mongodb.net/Covid?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false}, function(err){
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
        require("./routes/Users")(app, domain, RandomString);
    });

}

io.on("connection",function(socket){
    console.log("New connection " + socket.id);
});

function RandomString(stringLenght){
    var arrSymbol = ["a", "b", "c", "d", "e", "f", "g", "z", 0,1,2,3,4,5,6,7,8,9];
    var result = "";
    for(var i=1; i<=stringLenght; i++){
        var ran = Math.floor(Math.random() * arrSymbol.length);
        result += arrSymbol[ran];
    }
    return result;
}


