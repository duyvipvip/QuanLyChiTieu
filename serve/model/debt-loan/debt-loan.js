const mongoose = require('mongoose');
const debt_loanSchema = mongoose.Schema({
    name: String,
    image: String,
    detect: String
}, { collection: 'debt-loan'});

module.exports = mongoose.model('debt-loan', debt_loanSchema);