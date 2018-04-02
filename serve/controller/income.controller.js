
const mongoose = require("mongoose");
const incomeModel = require("../model/income.model");
const transactionModel = require("../model/transaction.model");

const path = require("path");
module.exports = {
    getAllIncome: getAllIncome,
    addIncome: addIncome,
    uploadImage: uploadImage,
    removeInCome:removeInCome
}

function getAllIncome(iduser){
    return incomeModel.find()
        .then((income) => {
            let data = [];
            income.forEach((item) => {
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
function uploadImage(idincome, file) {
    return new Promise(function (resolve, reject) {
        file.mv(path.join(__dirname, '../public/images/' + idincome + '.png'), function (err) {
            if (err)
                reject(err);
            return incomeModel.findOneAndUpdate({ _id: idincome }, { $set: { image: idincome } })
                .then(function (data) {
                    resolve(data);
                })
                .then(function (err) {
                    reject(err);
                })
        });
    });
}

function addIncome(bodyIncome){
    let newIncome = new incomeModel(bodyIncome);
    return newIncome.save()
        .then((income) => {
            return Promise.resolve(income);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

function removeInCome(idincome){
    return incomeModel.findByIdAndRemove(idincome)
        .then((income) => {
            return transactionModel.remove({idcategory: idincome})
                .then(() => {
                    return Promise.resolve(income);
                })
                .catch((err) => {
                    return Promise.resolve(err);
                })
        })
        .catch((err) => {
            return Promise.resolve(err);
        })
}

