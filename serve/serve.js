const path  = require('path');
var express = require('express');
var app     = express();
var serve   = require('http').createServer(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//CONNECT ĐẾN DATABASE
mongoose.connect('mongodb://havanduy:havanduy@ds261527.mlab.com:61527/wallet', {useMongoClient: true});
mongoose.Promise = global.Promise;

// PORT ĐỂ TRUY CẬP APPLICATION
const port = process.env.port || 3000;

// SỬ DỤNG BUILT-IN MIDDLEWARE 
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var wallet  = require('./model/wallet/wallet.router.js')(app);

serve.listen(port, () =>{
    console.log(`serve hoạt động trên port ${port}`);
});