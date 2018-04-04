var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var jwt = require('../utils/jwt');

var User            = require('../model/user.model');
var configAuth		 = require('./config');

module.exports = function(passport) {
	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(token, done){
		return done(null, token);
	});

	passport.use(new FacebookStrategy({
	    clientID: configAuth.facebookAuth.clientID,
	    clientSecret: configAuth.facebookAuth.clientSecret,
	    callbackURL: configAuth.facebookAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		User.findOne({'facebook.id': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user)
	    				return done(null, user);
	    			else {
	    				let obj = {
							"username": profile.displayName,
							"password": '',
							"email": profile.id,
							"hinhanh": "avatar.jpeg",
							"kichhoat": 'true',
						}
	    				let newUser = new User(obj);
	    				newUser.save(function(err){
	    					if(err)
								throw err;
							jwt.sign({
								email: newUser.email
							}, function (err, token) {
								return done(null, {token: token});
							})
	    				})
	    			}
	    		});
	    	});
	    }

	));
	passport.use(new GoogleStrategy({
	    clientID: configAuth.googleAuth.clientID,
	    clientSecret: configAuth.googleAuth.clientSecret,
	    callbackURL: configAuth.googleAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		User.findOne({'email': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user){
						jwt.sign({
							email: user.email
						}, function (err, token) {
							return done(null, {token: token});
						})
					}
	    			else {
						let obj = {
							"username": profile.displayName,
							"password": '',
							"email": profile.id,
							"hinhanh": profile.photos[0].value,
							"kichhoat": 'true',
						}
	    				let newUser = new User(obj);
	    				newUser.save(function(err){
	    					if(err)
								throw err;
							jwt.sign({
								email: newUser.email
							}, function (err, token) {
								return done(null, {token: token});
							})
	    				})
					}
	    		});
	    	});
	    }

	));
};