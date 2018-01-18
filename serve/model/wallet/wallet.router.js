var mongoose = require('mongoose');
var database = require('./wallet.js');

module.exports = function(app){
    app.get('/api/wallet', function(req, res){
        database.find(function(err, value){
            if(err){
                res.json({
                    message: "lay that bai", 
                    error: err,
                })
            }
            res.json({
                data:value
            })
        })
    })
}