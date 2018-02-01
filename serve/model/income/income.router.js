var _ = require('lodash');
var mongoose = require('mongoose');
var database = require('./income.js');

module.exports = function(app){
    // LẤY HIẾT TẤT CẢ CÁC THU NHẬP
    app.get('/api/income', function(req, res){
        database.find(function(err, value){
            if(err){
                res.json({
                    message: "lấy thu nhập thất bại"
                })
            }
            res.json({
                data: value
            })
        })
    })
}