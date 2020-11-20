var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(3000);

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khoapham2020:Hd6zH4tQSYULLh6U@cluster0.2d3ya.mongodb.net/Buoi1?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        console.log("Mongo connected error: " + err);
    }else{
        console.log("Mongo connected successfully.");
    }
});

const schemaSinhvien = new mongoose.Schema({
    hoten: String,
    namsinh:Number,
    url: String
});

const SinhvienModel = mongoose.model("Sinhvien", schemaSinhvien);

app.get("/", function(req, res){
    SinhvienModel.find(function(err, data){
        if(!err){
            res.render("home", {mangSV:data});
        }
    });
});

app.post("/xuly", function(req, res){
    var newSV =  SinhvienModel({
        hoten: req.body.hoten,
        namsinh:parseInt(req.body.namsinh),
        url: req.body.Hinh
    });
    newSV.save(function(err){
        if(err){
            res.json({result:0, errMsg:err});
        }else{
            res.redirect("./");
        }
    });
});