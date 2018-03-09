var userModel = require('../model/user.model');
var crypto = require('crypto');
var jwt = require('../utils/jwt');
var secret = 'meomeomeo';

module.exports = {
    login: login,
    me: me,
    checkAuth: checkAuth
}

function login(email, password) {
    var hash = crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
    
    return userModel.findOne({
        email: email,
        password: hash
    })
        .then(function (user) {
            
            if (user) {
                let kinhhoat = user['kichhoat'];
                if(kinhhoat.toString() == 'false'){
                    return Promise.reject({
                        statusCode: 400,
                        token: null,
                        message: 'Tài khoản của bạn trưa được kích hoạt! Xin vui lòng kiểm tra lại Email'
                    });
                }else{
                    return new Promise(function (resolve, reject) {
                        jwt.sign({
                            email: user.email
                        }, function (err, token) {
                            if (err) {
                                reject({
                                    statusCode: 400,
                                    message: err.message,
                                    token: null,
                                });
                            } else {
                                resolve({
                                    statusCode: 200,
                                    message: "Đăng nhập thành công",
                                    token: token,
                                    username: user.username,
                                    _id: user._id,
                                    hinhanh: user.hinhanh,
                                    email: user.email
                                });
                            }
                        })
                    });
                }
            } else {
                return Promise.reject({
                    statusCode: 400,
                    token: null,
                    message: 'Email hoặc mật khẩu không chính xác'
                });
            }
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

function me(token){
    
        
       
        
    
}
function duy(){
    
}
function checkAuth(nguoidung) {
    // console.log(nguoidung);
    return userModel.find(nguoidung)
        .then(function (foundNguoidung) {
            if (foundNguoidung) {
                return Promise.resolve(foundNguoidung);
            } else {
                return Promise.reject({
                    message: 'Not Found'
                });
            }
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}