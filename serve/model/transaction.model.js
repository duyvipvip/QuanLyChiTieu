const mongoose = require("mongoose");
const transactionSchema = mongoose.Schema({
    categorytransaction:{
        type: String,
        require: true
    },
    image: {
        type: String,
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
    },
    groupcategory:{
        type: String,
        require: true
    },
    idsaving: {
        type: String
    },
    idcategory: {
        type: String,
        require: true
    },
    time: {
        type: String,
    },
    location: {}
}, {collection: "transaction"})

module.exports = mongoose.model("transaction", transactionSchema);