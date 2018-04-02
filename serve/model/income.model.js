
const mongoose = require("mongoose");
const incomeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String,
    },
    iduser: {
        type: String,
    },
    detect: {
        type: String
    }
}, {collection: "income"});

module.exports = mongoose.model('incom1', incomeSchema);