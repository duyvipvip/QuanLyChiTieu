var router = require('express').Router();
var authController = require('../controller/auth.controller');
var jwt = require('./../utils/jwt');
var userModel = require('../model/user.model');
const passport = require('passport');

router.post('/login', login);
router.get('/me', me);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: 'http://localhost:4200/dangnhap' }), function (req, res) {
        res.redirect('http://localhost:4200/dangnhap;token=' + req.user.token);
    });
router.get('/facebook',
    passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: 'http://localhost:4200/dangnhap' }),
    function (req, res) {
        res.redirect('http://localhost:4200/dangnhap;token=' + req.user.token);
    });
module.exports = router;

function login(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    if (!email) {
        next({
            statusCode: 400,
            message: "email is required"
        })
    } else if (!password) {
        next({
            statusCode: 400,
            message: "password is required"
        })
    } else {
        authController.login(email, password)
            .then(function (user) {
                res.send(user)
            })
            .catch(function (err) {
                res.send(err);
            })
    }

}

function me(req, res, next) {
    let token = req.query.token;
    if (!token) {
        next({
            statusCode: 400,
            message: "token is required"
        })
    } else {
        jwt.verify(token, function (err, decodedData) {
            if (err) {
                res.status(401);
                res.json({
                    message: 'Invalid Token'
                });
            } else {
                var email = decodedData.email;
                return userModel.findOne({ email: email })
                    .then(function (foundNguoidung) {
                        if (foundNguoidung) {
                            res.send(foundNguoidung);
                        } else {
                            return Promise.reject({
                                message: 'Not Found'
                            });
                        }
                    })
                    .catch(function (err) {
                        res.send(err);
                    })
            }
        })
    }

}
