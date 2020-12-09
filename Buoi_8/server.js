var express = require("express");
var app = express();
app.listen(3000);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khoapham2020:RAeb97nav8kVZYwj@cluster0.2d3ya.mongodb.net/buoi8?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Mongose connected.");
    }
});

const Sinhvien = mongoose.model('Sinhvien', { 
    HoTen:String,
    GioiTinh: Boolean, //true nam, false n
    Tien: Number,
    NgayTao:Date
});

var mangVi = ["Loi luu du lieu", "..."];
var mangEn = ["Save db error", ""];

// Sinhvien: Save
app.post("/Sinhvien_addNew", function(req, res){
    var newSinhvien = new Sinhvien({
        HoTen   : req.body.HoTen,
        GioiTinh: req.body.GioiTinh, 
        Tien    : 0,
        NgayTao : Date.now()
    });
    newSinhvien.save(function(err){
        if(err){
            res.json({result:0, errMsg:err});
        }else{
            res.json({result:1});
        }
    });
});

app.post("/Sinhvien_list", function(req, res){
    /*
    Sinhvien.find({GioiTinh:{$ne:true}}, function(err, data){
        if(err){
            res.json({result:0, errMsg:err});
        }else{
            res.json({result:1, danhsach:data});
        }
    });
    */
    Sinhvien.find().sort({GioiTinh:-1}).exec(function(err, data){
        if(err){
            res.json({result:0, errMsg:err});
        }else{
            res.json({result:1, danhsach:data});
        }
    });
});

app.post("/Sinhvien_update", function(req, res){
    Sinhvien.findByIdAndUpdate(req.body._id, {
        HoTen   : req.body.HoTen,
        GioiTinh: req.body.GioiTinh, 
        Tien    : req.body.Tien 
    }, function(err){
        if(err){
            res.json({result:0, errMsg:err});
        }else{
            res.json({result:1});
        }
    });
});

app.post("/Sinhvien_delete", function(req, res){
    Sinhvien.findByIdAndDelete(req.body._id, function(err){
        if(err){
            res.json({result:0, errMsg:err});
        }else{
            res.json({result:1});
        }
    });
});

