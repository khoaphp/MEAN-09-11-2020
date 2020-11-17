var express =  require("express");
var app = express();

// body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000);

var mangSV = [
    new SinhVien("Teo", 2000),
    new SinhVien("Teo", 2000),
    new SinhVien("Teo", 2000)
];

app.post("/xuly", function(req, res){
    res.json( mangSV );
});

function SinhVien(hoten, namsinh){
    this.HOTEN = hoten;
    this.NAMSINH = namsinh;
}

app.get("/demo", function(req, res){
    //res.end();
    res.redirect("http://google.com");
});

app.get("/a.js", function(req,res){
    res.render("alert(123);");
});

app.post("/account", function(req, res){
    //
    //
    // 
    console.log("Chao ban Teo, ban 20 tuoi");
});