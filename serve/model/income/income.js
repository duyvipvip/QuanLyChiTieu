var mongoose = require('mongoose');
var incomeSchema   = mongoose.Schema({
    name: String,
    image: String,
    detect: String,
}, { collection: 'income'});

module.exports = mongoose.model('income', incomeSchema);