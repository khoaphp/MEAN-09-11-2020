var express = require("express");
var app = express();
app.listen(2999);

var mang=[];

app.get("/dangky/:ten", function(req, res){
    mang.push(req.params.ten);
    console.log(mang);
    res.send("Cam on ban da dang ky");
});

app.get("/xuly", function(req, res){
    var A = mang[Math.floor(Math.random() * mang.length)];
    var B = mang[Math.floor(Math.random() * mang.length)];
    res.send(A + " mua trà sữa cho " + B);
});