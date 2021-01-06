var bcrypt = require('bcryptjs');

const User = require("../models/User");

// Nodemailer // Gmail
const nodemailer = require("nodemailer");

var fs = require('fs');

module.exports = function(app, domain, RandomString){

    app.get("/", function(req, res){
        //SendMail().catch(console.error);
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
        // Paramters: Email, Password, RePassword, Image, Name, Address, City, District, Ward, Phone
        User.findOne({Email:req.body.Email}, function(err, user){
            if(err){
                res.json({result:-1, errMsg:err});
            }else{
                if(!user){
                    
                    // Check same password
                    if(req.body.Password != req.body.RePassword){
                        res.json({result:-1, errMsg:"Password is not matched!"});
                    }else{
                        
                        // Ma hoa password
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(req.body.Password, salt, function(err, hash) {
                                if(err){
                                    res.json({result:-1, errMsg:"Password encrypted error!"});
                                }else{

                                    // Insert new User
                                    var newUser = new User({
                                        Email:      req.body.Email,
                                        Password:   hash, 
                                        Image:      req.body.Image,
                                        Name:       req.body.Name,
                                        Address:    req.body.Address,
                                        City:       req.body.City,
                                        District:   req.body.District,
                                        Ward:       req.body.Ward,
                                        Phone:      req.body.Phone,
                                        RandomString:   RandomString(100), 
                                        Active:         false,
                                        RegisterDate:   Date.now()
                                    });

                                    newUser.save(function(err){
                                        if(err){
                                            res.json({result:-1, errMsg:err});
                                        }else{
                                            // Gui mail
                                            fs.readFile("./views/mailTemplates/active.html", 'utf8', function (err, data) {
                                                if (err) throw err;
                                                data = data.replace("XXX", newUser.RandomString);
                                                SendMail([req.body.Email], "Covid || Activation mail", data, res);
                                            });
                                        }
                                    });

                                }
                            });
                        });

                        
                        
                    }

                }else{
                    res.json({result:-1, errMsg:"Email is not availble!"});
                }
            }
        });

        // Password: Bcrypt (Ma hoa mk)
        
        // Insert NEW USER

        // Gui MAIL: http://localhost:3000/active/xxxxxxxxxxxx

    });

}


//SendMail(["khoaphp@yahoo.com"], "Hello World", "<img src='https://khoapham.vn/public/images/logo-370.png' />");
async function SendMail(to, subject, content, res) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "nodejsdemocovid@gmail.com", // generated ethereal user
        pass: "123456@@@A", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    var addressTo = "";
    to.forEach(function(email){
        addressTo += email + " ,";
    });

    let info = await transporter.sendMail({
      from: '"Admin Covid Page 👻" <foo@example.com>', // sender address
      to: addressTo, // list of receivers
      subject: subject, // Subject line
      text: "Hello world?", // plain text body
      html: content, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    res.json({result:1});
}
  