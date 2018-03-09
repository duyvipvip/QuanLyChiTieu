var mongoose = require('mongoose');
var walletSchema   = mongoose.Schema({
    namewallet:{
        type: String,
        require: true
    },
    iduser: {
        type: String,
        require: true
    },
}, { collection: 'wallet'});

module.exports = mongoose.model('wallet', walletSchema);