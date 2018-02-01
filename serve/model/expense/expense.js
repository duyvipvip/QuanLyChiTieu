var mongoose = require('mongoose');
var expenseSchema = mongoose.Schema({
    name: String,
    image: String,
    detect: String,
}, { collection: 'expense'});

module.exports = mongoose.model('expense', expenseSchema);