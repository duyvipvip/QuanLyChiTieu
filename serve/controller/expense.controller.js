const expenseModel = require('../model/expense.model');
const path = require("path");
const transactionModel = require("../model/transaction.model");

module.exports = {
    getAllExpense: getAllExpense,
    addExpense: addExpense,
    uploadImage:uploadImage,
    removeExpense:removeExpense
}

function getAllExpense(iduser){
    return expenseModel.find()
        .then((expense) => {
            let data = [];
            expense.forEach((item) => {
                if(item.iduser == undefined || item.iduser == iduser){
                    data.push(item);
                }
            })
            return Promise.resolve(data);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

// UPLOAD FILE
function uploadImage(idexpense, file) {
    return new Promise(function (resolve, reject) {
        file.mv(path.join(__dirname, '../public/images/' + idexpense + '.png'), function (err) {
            if (err){
                reject(err);
            }
            return expenseModel.findOneAndUpdate({ _id: idexpense }, { $set: { image: idexpense } })
                .then(function (data) {
                    resolve(data);
                })
                .then(function (err) {
                    reject(err);
                })
        });
    });
}

function addExpense(bodyExpense){
    let newExpense = new expenseModel(bodyExpense);
    return newExpense.save()
        .then((expense) => {
            return Promise.resolve(expense);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}


function removeExpense(idexpense){
    return expenseModel.findByIdAndRemove(idexpense)
        .then((expense) => {
            return transactionModel.remove({idcategory: idexpense})
                .then(() => {
                    return Promise.resolve(expense);
                })
                .catch((err) => {
                    return Promise.resolve(err);
                })
        })
        .catch((err) => {
            return Promise.resolve(err);
        })
}