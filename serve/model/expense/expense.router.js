var mongoose = require('mongoose');
var database = require('./expense');

module.exports = function(app){

    // LẤY TẤT CẢ CÁC CHI TIÊU
    app.get('/api/expense', (req, res) => {
        database.find((err, value) => {
            if(err){
                res.json({
                    message: "không lấy được chi tiêu"
                })
            }else{
                res.json({
                    data: value
                })
            }
        })
    })
}