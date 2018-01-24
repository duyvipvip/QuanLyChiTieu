var _ = require('lodash');
var mongoose = require('mongoose');
var database = require('./wallet.js');

// LẤY HIẾT TẤT CẢ CÁC VÍ
module.exports = function(app){
    app.get('/api/wallet', function(req, res){
        database.find(function(err, value){
            if(err){
                res.json({
                    message: "lay that bai"
                })
            }
            res.json({
                data: value
            })
        })
    })

    // LẤY MỘT VÍ CÓ ID LÀ
    app.get('/api/wallet/:id', (req, res) => {
        console.log(req.params.id);
        database.findById({_id: req.params.id}, (err , data) => {
            if(err){
                res.json({
                    message: 'lấy thất bại',
                })
            }
            res.json({
                data: data
            })
        })
    })
}

// // THÊM VÍ
// module.exports = (app) => {
//     app.put('/api/wallet', (req, res) => {
//         var wallet = new database(req.body);
//         wallet.save((err) => {
//             if(err){
//                 res.json({
//                     message: 'edit thất bại'
//                 })
//             }
//             res.json({
//                 message: 'add thành công'
//             })
//         })

//     })
// }