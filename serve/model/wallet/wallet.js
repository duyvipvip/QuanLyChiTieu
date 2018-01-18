var mongoose = require('mongoose');
var walletSchema   = mongoose.Schema({

}, { collection: 'Danhgianhac'});

module.exports = mongoose.model('Danhgianhac', walletSchema);