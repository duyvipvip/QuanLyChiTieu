const userModel = require("../model/user.model");
const crypto = require('crypto');
const secret = 'meomeomeo';
const mail = require('../utils/mail');
const jwt = require('../utils/jwt');
var path = require('path');
const config = require('../config/config');
var generator = require('generate-password');

module.exports = {
    createUser: createUser,
    getAllUser: getAllUser,
    kichhoattaikhoan: kichhoattaikhoan,
    uploadAvatar: uploadAvatar,
    changePassword: changePassword,
    forgotPassword: forgotPassword
}

function forgotPassword(userEmail, question) {
    return new Promise((resolve, reject) => {
        userModel.findOne({ email: userEmail }).then(res => {
            if (res.cauhoi === question) {
                var password = generator.generate({
                    length: 6,
                    numbers: true
                });
                var hash = crypto.createHmac('sha256', secret)
                    .update(password)
                    .digest('hex');
                res.password = hash;
                res.save().then(data => {
                    return mail.sendMail('', res.email, 'Quên mật khẩu', password)
                        .then((data) => {
                            resolve({
                                statusCode: 200,
                                message: 'Đã gửi mật khẩu qua mail'
                            });
                        }).catch(function (err) {
                            reject({
                                statusCode: 400,
                                message: 'Lỗi gửi mail!!!'
                            });
                        })
                }).catch(err => {
                    reject({
                        statusCode: 400,
                        message: 'Lỗi đổi mật khẩu'
                    });
                })
            }
            else {
                reject({
                    statusCode: 400,
                    message: 'Sai câu hỏi bảo mật'
                })
            }
        }).catch(err => {
            reject({
                statusCode: 400,
                message: 'Không tồn tại email đăng kí'
            })
        })
    })
}

function changePassword(userId, data) {
    return userModel.findOne({ _id: userId })
        .then(user => {
            if (user) {
                return new Promise((resolve, reject) => {
                    var hash = crypto.createHmac('sha256', secret)
                        .update(data.oldPassword)
                        .digest('hex');
                    if (user.password !== hash) {
                        reject({
                            statusCode: 400,
                            message: 'Sai mật khẩu'
                        })
                    }
                    else {
                        if (data.newPassword !== data.confirmPassword) {
                            reject({
                                statusCode: 400,
                                message: 'Xác nhận mật khẩu mới không khớp'
                            })
                        }
                        else {
                            var temp = crypto.createHmac('sha256', secret)
                                .update(data.newPassword)
                                .digest('hex');
                            userModel.findOneAndUpdate({ _id: userId }, { password: temp }).then(res => {
                                resolve({
                                    statusCode: 200,
                                    message: 'Đổi mật khẩu thành công'
                                })
                            }).catch(err => {
                                reject({
                                    statusCode: 400,
                                    message: 'Đổi mật khẩu thất bại'
                                })
                            })
                        }
                    }
                })
            }
        })
        .catch(err => {
            return Promise.reject(err);
        })
}

function createUser(newUser) {
    return userModel.find({ email: newUser.email })
        .then(function (foundUsers) {
            if (foundUsers.length > 0) {
                return Promise.reject({
                    statusCode: 400,
                    message: 'Email đã tồn tại'
                });
            } else {
                var hash = crypto.createHmac('sha256', secret)
                    .update(newUser.password)
                    .digest('hex');

                newUser.password = hash;
                var user = new userModel(newUser);

                return user.save()
                    .then(function (user) {
                        jwt.sign({
                            email: user.email
                        }, function (err, token) {
                            let url = "http://localhost:3000/api/user/kichhoattaikhoan?token=" + token;
                            return mail.sendMail('', user.email, 'Xin mời bạn click vào dường link để hoàn tất quá trình đăng kí', url)
                                .then((res) => {
                                    return Promise.resolve(res);
                                }).catch(function (err) {
                                    return Promise.reject(err);
                                })
                        })
                    })
                    .catch(function (err) {
                        return Promise.reject(err);
                    })
            }
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

function getAllUser() {
    return userModel.find()
        .then((user) => {
            return Promise.resolve(user);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

// Upload hình ảnh 
function uploadAvatar(userId, file) {
    console.log(file);
    //find user to upload avatar
    return userModel.findOne({ _id: userId })
        .then(function (user) {
            if (user) {
                return new Promise(function (resolve, reject) {
                    //move to avatar folder
                    file.mv(path.join(__dirname, '../public/avatars/avatar_' + user._id + '.png'), function (err) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        //update current user with new avatar path
                        return userModel.findOneAndUpdate({ _id: userId }, { $set: { hinhanh: 'avatar_' + user._id + '.png' } })
                            .then(function (data) {
                                resolve(`${config.server.domain}:${config.server.port}/avatars/avatar_${user._id}.png`);
                            })
                            .then(function (err) {
                                reject(err);
                            })
                    });
                });
            } else {
                return Promise.reject({
                    message: "Not Found",
                    statusCode: 404
                });
            }
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

function kichhoattaikhoan(token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, function (err, decodedData) {
            if (err) {
                reject({
                    statusCode: 400,
                    message: "Invalid Token"
                })
            } else {
                var email = decodedData.email;
                return userModel.findOne({ email: email })
                    .then(function (user) {
                        if (user) {
                            user.kichhoat = 'true';
                            return user.save()
                                .then((updateUser) => {
                                    resolve({
                                        statusCode: 200,
                                    })
                                })
                        } else {
                            reject({
                                statusCode: 400,
                                message: "Không tìm thấy user"

                            })
                        }
                    })
                    .catch(function (err) {
                        reject({
                            statusCode: 400,
                            message: err
                        })
                    })
            }
        })
    })

}