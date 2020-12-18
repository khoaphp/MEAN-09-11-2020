var express = require("express");
var app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(3000);

app.get("/", function(req, res){
    res.render("home2");
});

app.post("/xuly", function(req, res){
    console.log( req.headers["hoten"] );
    var so = parseInt( req.body.so ) * 2;
    res.json({ketqua:so});
});