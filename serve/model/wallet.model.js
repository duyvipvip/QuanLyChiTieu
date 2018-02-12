var mongoose = require('mongoose');
var walletSchema   = mongoose.Schema({
    namewallet: String,
    money: Number,
    transactions: [
        {
            categorytransaction: String,
            imagecategory: String,
            moneytransaction: String,
            datecreatetransaction: Date,
            taguser: [],
            idwallet: String,
            notetransaction: String,
            groupcategory: String,
            detecttransaction: String
        }
    ],
}, { collection: 'wallet'});

module.exports = mongoose.model('wallet', walletSchema);