const router = require("express").Router();
const userController = require('../controller/user.controller');

router.post("/create", createUser );
router.get("/getall", getAllUser );
router.post("/avatar", uploadAvatar );
router.get("/kichhoattaikhoan", kichhoattaikhoan);
module.exports = router;

function createUser(req, res, next){
    let user = req.body
    if (!user.email) {
        next({
            statusCode: 400,
            message: "email is required"
        })
    }else if(!user.username){
        next({
            statusCode: 400,
            message: "username  is required"
        })
    }else if(!user.password){
        next({
            statusCode: 400,
            message: "password  is required"
        })
    }else if(!user.kichhoat){
        next({
            statusCode: 400,
            message: "kích hoạt  is required"
        })
    }else{
        userController.createUser(user)
        .then((user) => {
            res.json({
                data: user,
            })
        })
        .catch((err) => {
            next(err);
        })
    }
    
}

// UPLOAD HÌNH ẢNH
function uploadAvatar(req, res, next) {
    //console.log('vao2');
    //console.log(req.files.file);
    // if (!req.files)
    //     return next({
    //         message: 'No files were uploaded.'
    //     });

    // var uploadedFile = req.files.file;
    // req.user._id = "5a97b38b9e01cbe0f071a6e3";
    // userController.uploadAvatar(req.user._id, uploadedFile)
    //     .then(function (avatar) {
    //         res.send({
    //             avatar: avatar
    //         })
    //     })
    //     .catch(function (err) {
    //         next(err);
    //     })
}

// LẤY TẤT CẢ CÁC USER
function getAllUser(req, res, next){
    userController.getAllUser()
        .then((user) => {
            res.json({
                data: user,
            })
        })
        .catch((err) => {
            res.send(err);
        })
}

function kichhoattaikhoan(req, res, next){
    let token = req.query.token;
    if (!token) {
        next({
            statusCode: 400,
            message: "token is required"
        })
    }else{
        userController.kichhoattaikhoan(token)
        .then((result) => {
            res.writeHead(301, {
                Location: "http://localhost:4200/dangnhap"
              });
            res.end();
        })
        .catch((err) => {
            next(err.message);
        })
    }
    
}
