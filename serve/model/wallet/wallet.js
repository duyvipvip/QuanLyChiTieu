var mongoose = require('mongoose');
var walletSchema   = mongoose.Schema({
    namewallet: String,
    money: Number,
}, { collection: 'wallet'});

module.exports = mongoose.model('wallet', walletSchema);