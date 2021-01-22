var bcrypt = require('bcryptjs');

const User = require("../models/User");
const Token = require("../models/Token");

//JWT
var jwt = require("jsonwebtoken");
var privateKey = "KLASDU*(@YUDIOHDHO:sadhjuihìqudhUOADHU*Q!@UHDUIWH";

// Nodemailer // Gmail
const nodemailer = require("nodemailer");

var fs = require('fs');

//multer
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/upload/avatar')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});  
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if( file.mimetype=="image/bmp"  || 
            file.mimetype=="image/png"  ||
            file.mimetype=="image/jpg"  ||
            file.mimetype=="image/jpeg" ||
            file.mimetype=="image/gif"
        ){
            cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("file-0");


module.exports = function(app, domain, RandomString){

    app.get("/", function(req, res){
        //SendMail().catch(console.error);
        res.render("home/default", {domain:domain, page:"home"});
    });

    app.get("/login", function(req, res){
        res.render("home/default", {domain:domain, page:"login"});
    });

    app.post("/login", function(req, res){
        //Params: Email, Password
        User.findOne({Email:req.body.Email}, function(err, item){
            if(err || !item){
                res.json({result:-1, errMsg:"Email is not registered."});
            }else{
                if(item.Active==false){
                    res.json({result:-1, errMsg:"You account has not been activated."});
                }else{
                    bcrypt.compare(req.body.Password, item.Password, function(err, resB){
                        if(err || resB==false){
                            res.json({result:-1, errMsg:"Wrong password."});
                        }else{

                            item.Password = "Bạn thật là lịch sự & dễ thương";
                            jwt.sign({
                                exp: Math.floor(Date.now()/1000) + 60*60*24*30*3,
                                data: item
                            }, privateKey, function(err, token){
                                if(err){
                                    res.json({result:-1, errMsg:"Token created error."});
                                }else{
                                    
                                    var newToken = new Token({
                                        Token:token,
                                        Active:true,  // true còn hiệu lực, false !
                                        User: item._id,
                                        LoginDate:Date.now()
                                    });
                                    newToken.save(function(err){
                                        if(err){
                                            res.json({result:-1, errMsg:"Save token error."});
                                        }else{
                                            res.json({result:1, Token:token});
                                        }
                                    });

                                }
                            });
                            
                        }
                    });

                    
                }
            }
        });
    });

    app.get("/register", function(req, res){
        res.render("home/default", {domain:domain, page:"register"});
    });

    app.post("/register", function(req, res){
   
        // Paramters: Email, Password, RePassword, Image, Name, Address, Phone
        // Response: res.json({result:-1, errMsg:err})
        //                            -1: Thất bại  //  1: Thành công  

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
                                        City:       0,
                                        District:   0,
                                        Ward:       0,
                                        Phone:      req.body.Phone,
                                        RandomString:   RandomString(100), 
                                        Active:         false,
                                        RegisterDate:   Date.now(),
                                        userGroup: 0
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
    });

    app.post("/uploadImage", function(req, res){
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              console.log("A Multer error occurred when uploading."); 
              res.json({"result":-1, "errMsg": "A Multer error occurred when uploading."});
            } else if (err) {
              console.log("An unknown error occurred when uploading." + err);
              res.json({"result":-1, "errMsg": "An unknown error occurred when uploading." + err});
            }else{
                console.log("Upload is okay");
                console.log(req.file); // Thông tin file đã upload
                res.json({"result":1, "file": req.file.filename});
            }
    
        });
    });

    app.get("/active/:rand", function(req, res){
        // Tìm User theo :rand
        User.findOne({RandomString:req.params.rand}, function(err, item){
            if(err || !item){
                //res.json({result:-1, errMsg: "URL is wrong"});
                res.render("home/default", {result:-1, domain:domain, page:"active", errMsg: "URL is wrong"});
            }else{
                if(item.Active){
                    //res.json({result:-1, errMsg: "Your account has been activated already"});
                    res.render("home/default", {result:-1, domain:domain, page:"active", errMsg: "Your account has been activated already"});
                }else{
                    User.findOneAndUpdate({RandomString:req.params.rand}, {Active:true}, function(err){
                        if(err){
                            //res.json({result:-1, errMsg: "Activate failed."});
                            res.render("home/default", {result:-1, domain:domain, page:"active", errMsg: "Activate failed."});
                        }else{
                            //res.json({result:1, errMsg: "Your account has been activated successfully."});
                            res.render("home/default", {result:1, domain:domain, page:"active", errMsg: "Your account has been activated successfully."});
                        }
                    });
                }
            }
        });
    });
    
    app.post("/verifyUser", function(req, res){
        if(!req.body.Token){
            res.json({result:-1, errMsg:"Please send Token to check."});
        }else{
            Token.findOne({Token:req.body.Token, Active:true}, function(err, item){
                if(err || !item){
                    res.json({result:-1, errMsg:"Wrong token, please login."});
                }else{
                    jwt.verify(req.body.Token, privateKey, function(err, decoded) {
                        if(err || decoded===undefined){
                            res.json({result:-1, errMsg:"Wrong token verified."});
                        }else{
                            res.json({result:1, user:decoded});
                        }
                    });
                }
            });
        }
    });

    app.post("/verifyAdmin", function(req, res){
        if(!req.body.Token){
            res.json({result:-1, errMsg:"Please send Token to check."});
        }else{
            Token.findOne({Token:req.body.Token, Active:true}, function(err, item){
                if(err || !item){
                    res.json({result:-1, errMsg:"Wrong token, please login."});
                }else{
                    jwt.verify(req.body.Token, privateKey, function(err, decoded) {
                        if(err || decoded===undefined){
                            res.json({result:-1, errMsg:"Wrong token verified."});
                        }else{
                            if(decoded.data.userGroup==0){
                                res.json({result:-1, errMsg:"You are not administrator."});
                            }else{
                                res.json({result:1, user:decoded});
                            }
                        }
                    });
                }
            });
        }
    });

    app.post("/logout", function(req, res){
        if(!req.body.Token){
            res.json({result:-1, errMsg:"Please send Token to check."});
        }else{
            Token.findOne({Token:req.body.Token, Active:true}, function(err, item){
                if(err || !item){
                    res.json({result:-1, errMsg:"Wrong token, please check again."});
                }else{ 
                    // xóa luôn TOken (ko cần update)
                    Token.findByIdAndUpdate(item._id, {Active:false}, function(err){
                        if(err){
                            res.json({result:-1, errMsg:"Update token status error."});
                        }else{
                            res.json({result:1});
                        }
                    });
                }
            });
        }
    });

    // Quản trị USERS
    app.get("/admin/user", function(req, res){
        res.render("home/default", {domain:domain, page:"admin/user"});
    });

    app.post("/users-list", function(req, res){
        // Paramters: Token
        if(!req.body.Token){
            res.json({result:-1, errMsg:"Please send Token to check."});
        }else{
            Token.findOne({Token:req.body.Token, Active:true}, function(err, item){
                if(err || !item){
                    res.json({result:-1, errMsg:"Wrong token, please login."});
                }else{
                    jwt.verify(req.body.Token, privateKey, function(err, decoded) {
                        if(err || decoded===undefined){
                            res.json({result:-1, errMsg:"Wrong token verified."});
                        }else{
                            if(decoded.data.userGroup==0){
                                res.json({result:-1, errMsg:"You are not administrator."});
                            }else{
                                // list Users
                                User.find({},{_id:1, Email:1, Image:1, Active:1, userGroup:1}, function(err, data){
                                    if(err){
                                        res.json({result:-1, errMsg:err});
                                    }else{
                                        res.json(data);
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
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
  