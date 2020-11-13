//express
var express = require("express");
var app = express();
app.listen(3000);

app.get("/tong/:so1/:so2", function(req, res){
    var a = req.params.so1;
    a = parseInt(a);
    var b = req.params.so2;
    b = parseInt(b);
    var tong = a + b;
    res.send(tong + "");
});

app.get("/mean", function(req, res){
    console.log("Xu ly get /mean");
    console.log(req);
    res.send("Ban dang hoc buoi thu 2!");
});

app.post("/mean", function(req, res){
    res.send("POST /MEAN");
});

app.get("/hoten", function(req, res){
    res.send("Khoa Pham");
});

