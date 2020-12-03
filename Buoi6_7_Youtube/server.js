var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.listen(3000);

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const youtubedl = require('youtube-dl')

// ext: m4a (audio) || mp4
// width/height
// acodec: mp4a.40.2
app.get("/", function(req, res){
    res.render("home");
});

app.post("/xuly", function(req, res){
    const url = req.body.URL;
    const options = ['--username=user', '--password=hunter2']
    
    youtubedl.getInfo(url, options, function(err, info) {
        if (err){
            res.json({result:0, erMsg:err});
        }else{
            res.json(info);
        }
    })
});


 

