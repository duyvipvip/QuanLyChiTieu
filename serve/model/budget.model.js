const mongoose = require("mongoose");
const budgetSchema = mongoose.Schema({
    idcategory: {
        type: String,
        require: true
    },
    imagecategory: {
        type: String,
        require: true
    },
    namecategory: {
        type: String,
        require: true
    },
    targetmoney: {
        type: String,
        require: true
    },
    datestart:{
        type: Date,
        require: true
    },
    dateend:{
        type: Date,
        require: true
    },
    iduser: {
        type: String,
        require: true
    },
    idwallet:{
        type: String,
        require: true
    }
}, {collection: "budget"})

module.exports = mongoose.model("budget", budgetSchema);