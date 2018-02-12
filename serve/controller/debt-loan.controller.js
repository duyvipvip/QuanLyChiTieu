const debt_loanModel = require("../model/debt-loan.model");

module.exports = {
    getAllDebtloan: getAllDebtloan
}

function getAllDebtloan(){
    return debt_loanModel.find()
        .then((debt_loan) => {
            return Promise.resolve(debt_loan);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}