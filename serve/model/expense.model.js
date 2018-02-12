const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    detect: {
        type: String
    }
}, { collection: 'expense'})

module.exports = mongoose.model('expense1', expenseSchema);