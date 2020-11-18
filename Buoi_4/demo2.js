var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

var mangSV = [];

app.listen(3000);

app.get("/sv", function(req, res){
    res.render("sv");
});

app.post("/xuly", function(req, res){
    var ht = req.body.hoten;
    var ns = req.body.namsinh;
    mangSV.push( new Sinhvien(ht, ns) );
    res.render("ds", {DANHSACH:mangSV});
});

function Sinhvien(hoten, namsinh){
    this.HOTEN = hoten;
    this.NAMSINH = namsinh;
}