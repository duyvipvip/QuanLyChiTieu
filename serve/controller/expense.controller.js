const expenseModel = require('../model/expense.model');

module.exports = {
    getAllExpense: getAllExpense
}

function getAllExpense(){
    return expenseModel.find()
        .then((expense) => {
            return Promise.resolve(expense);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}