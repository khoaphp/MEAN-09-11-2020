const User = require("../models/User");

module.exports = function(app, domain){

    app.get("/", function(req, res){
        res.render("home/default", {domain:domain, page:"home"});
    });

    app.get("/login", function(req, res){
        res.render("home/default", {domain:domain, page:"login"});
    });

    app.get("/register", function(req, res){
        res.render("home/default", {domain:domain, page:"register"});
    });

    app.post("/register", function(req, res){
        // Khong duoc trung EMAIL
        // Password: Bcrypt (Ma hoa mk)
        // Insert NEW USER
        // Gui MAIL: ./active/xxxxxxxxxxxx

    });

}