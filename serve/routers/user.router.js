const router = require("express").Router();
const userController = require('../controller/user.controller');
const auth = require("../middle-ware/auth");

router.post("/create", createUser);
router.get("/getall", getAllUser);
router.post("/avatar", auth.auth(), uploadAvatar);
router.post("/doimatkhau", auth.auth(), changePassword);
router.get("/kichhoattaikhoan", kichhoattaikhoan);
router.post("/quenmatkhau", forgotPassword);
module.exports = router;

function forgotPassword(req, res, next) {
    let data = req.body;
    if (!data.email) {
        next({
            statusCode: 400,
            message: "Email is required"
        })
    } else if (!data.question) {
        next({
            statusCode: 400,
            message: "Question is required"
        })
    }
    userController.forgotPassword(data.email, data.question)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            next(err);
        })
}

function changePassword(req, res, next) {
    let user = req.body;
    if (!user.oldPassword) {
        next({
            statusCode: 400,
            message: "oldPassword is required"
        })
    } else if (!user.newPassword) {
        next({
            statusCode: 400,
            message: "newPassword  is required"
        })
    } else if (!user.confirmPassword) {
        next({
            statusCode: 400,
            message: "confirmPassword  is required"
        })
    }
    userController.changePassword(req.user[0]._id, user)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            next(err);
        })
}

function createUser(req, res, next) {
    let user = req.body
    if (!user.email) {
        next({
            statusCode: 400,
            message: "email is required"
        })
    } else if (!user.username) {
        next({
            statusCode: 400,
            message: "username  is required"
        })
    } else if (!user.password) {
        next({
            statusCode: 400,
            message: "password  is required"
        })
    } else {
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
    if (!req.files)
        return next({
            message: 'No files were uploaded.'
        });

    var uploadedFile = req.files.file;

    userController.uploadAvatar(req.user[0]._id, uploadedFile)
        .then(function (avatar) {
            res.send({
                avatar: avatar
            })
        })
        .catch(function (err) {
            next(err);
        })
}

// LẤY TẤT CẢ CÁC USER
function getAllUser(req, res, next) {
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

function kichhoattaikhoan(req, res, next) {
    let token = req.query.token;
    if (!token) {
        next({
            statusCode: 400,
            message: "token is required"
        })
    } else {
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
