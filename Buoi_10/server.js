var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./Views");

// Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:C39eA6yKNBVulS5l@cluster0.aefj6.mongodb.net/News?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false}, function(err){
    if(err){
        console.log("Mongodb connected error!!!");
    }else{
        console.log("Mongodb connected successful.");
    }
});

app.listen(3000);

const Cap1 = require("./Models/Cap1");
const Cap2 = require("./Models/Cap2");

// Insert Cap1
app.get("/cap1/:Title", function(req, res){
    var cap1 = new Cap1({
        Title: req.params.Title,
        MangCon:[]
    });
    cap1.save(function(err){
        if(!err){
            res.send("Insert Cap1 successful.");
        }
    });
});

// Insert Cap2
app.get("/cap2/:idCap1/:Title", function(req, res){
    var cap2 = new Cap2({
        Title: req.params.Title
    });
    cap2.save(function(err){
        if(!err){
            console.log("Insert cap2 successful.");
            Cap1.findByIdAndUpdate(req.params.idCap1, {
                $push: {MangCon:cap2._id}
            }, function(err){
                if(!err){ res.send("Save Cap1/Cap2 successful"); }
            });
        }
    });
});

app.get("/", function(req, res){
    var cap1 = Cap1.aggregate([{
        $lookup: {
            from: "cap2",
            localField: "MangCon",
            foreignField: "_id",
            as: "DanhSachCap2"
        }
    }], function(err, data){
        if(!err){
            //res.render("home", {menu:data});
            res.json(data);
        }
    });
});