const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema({
    categorytransaction:{
        type: String,
        require: true
    },
    iduser: {
        type: String,
        require: true
    },
    imagecategory:{
        type: String,
        require: true
    },
    moneytransaction:{
        type: String,
        require: true
    },
    datecreatetransaction:{
        type: Date,
        require: true
    },
    taguser: {
        type: []
    },
    idwallet:{
        type: String,
        require: true
    },
    notetransaction:{
        type: String,
        require: true
    },
    groupcategory:{
        type: String,
        require: true
    },
    idcategory: {
        type: String,
        require: true
    }
}, {collection: "transaction"})

module.exports = mongoose.model("transaction", transactionSchema);