const mongoose = require("mongoose");
const debt_loanSchema = mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    },
    detect: {
        type: String
    }
}, {collection: "debt-loan"})

module.exports = mongoose.model("debt-loan", debt_loanSchema);