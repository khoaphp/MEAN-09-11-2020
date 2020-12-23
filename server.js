var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

io.on("connection",function(socket){
    console.log("New connection " + socket.id);

    socket.on("client-send-text", function(data){
        console.log(data);
        //io.sockets.emit("server-send-text", data);
        //socket.broadcast.emit("server-send-text", data);
        socket.to(data.to).emit("server-send-text", data.txt);
    });

    socket.on("disconnect", function(){
        console.log(socket.id + " disconnected!");
    });

    socket.on("chonRoom", function(data){
        socket.join(data);
        console.log(socket.id + " has joined room " + data);
    });

    socket.on("client-send-text-inRoom", function(data){
        io.in(data.RoomName).emit("server-send-text", data.txt);
    });

});

app.get("/", function(req, res){
    res.render("home");
});

