var _ = require('lodash');
var mongoose = require('mongoose');
var database = require('./wallet.js');


module.exports = function(app){
    // LẤY HIẾT TẤT CẢ CÁC VÍ
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

    // CHỈNH SỬA VÍ CÓ ID LÀ
    app.post('/api/wallet/update/:id', (req, res) => {
        console.log('ok');
        console.log(req.body.money+'fefe');
        database.findByIdAndUpdate({_id: req.params.id}, req.body , function(err){
            if(err){
                res.send(err);
            }
            res.json({
                message: "update thành công"
            })
        })
    });

    // THÊM VÍ
    app.put('/api/wallet/add', (req, res) => {
        console.log('ok add');
        var wallet = new database(req.body);
        wallet.save((err) => {
            if(err){
                res.json({
                    message: 'Thêm wallet thất bại'
                })
            }
            res.json({
                message: 'Thêm wallet thành công'
            })
        })

    })

    // XOÁ 1 VÍ
    app.delete('/api/wallet/delete/:id', function(req, res){
        database.findByIdAndRemove({_id: req.params.id}, function(err){
            if(err){
                res.send(err);
            }
            res.json({
                message: "Xóa wallet thành công"
            })
        })
    });
}

