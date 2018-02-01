const mongoose = require('mongoose');
const database = require('./debt-loan');

module.exports = function(app){
    app.get('/api/debt-loan', (req, res) => {
        database.find((err, value) => {
            if(err){
                res.json({
                    message: err,
                })
            }
            res.json({
                data: value,
            })
        })
    })
}