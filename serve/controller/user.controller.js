const userModel = require("../model/user.model");
const crypto = require('crypto');
const secret = 'meomeomeo';
const mail = require('../utils/mail');
const jwt = require('../utils/jwt');
var path = require('path');

module.exports = {
    createUser: createUser,
    getAllUser: getAllUser,
    kichhoattaikhoan: kichhoattaikhoan,
    uploadAvatar: uploadAvatar
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
                            let url = "http://localhost:3000/api/user/kichhoattaikhoan?token="+token;
                            return mail.sendMail('', user.email, 'Xin mời bạn click vào dường link để hoàn tất quá trình đăng kí',url)
                                .then((res)=> {
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

function getAllUser(){
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
    //find user to upload avatar
    return userModel.findOne({ _id: userId })
        .then(function (user) {
            if (user) {
                return new Promise(function (resolve, reject) {
                    //move to avatar folder
                    file.mv(path.join(__dirname, '../public/avatars/avatar_' + user._id + '.png'), function (err) {
                        if (err)
                            reject(err);
                        //update current user with new avatar path
                        return userModel.findOneAndUpdate({ _id: userId }, { $set: { hinhanh: 'avatar_' + user._id + '.png' } })
                            .then(function (data) {
                                resolve(`${constants.server.domain}:${constants.server.port}/avatars/avatar_${user._id}.png`);
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

function kichhoattaikhoan(token){
    return new Promise(function (resolve, reject) {
        jwt.verify(token, function (err, decodedData) {
            if (err) {
                reject({
                    statusCode: 400,
                    message: "Invalid Token"
                })
            } else {
                var email = decodedData.email;
                return userModel.findOne({email: email})
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