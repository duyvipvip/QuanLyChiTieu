const transactionModel = require("../model/transaction.model");
const walletModel = require("../model/wallet.model");
const config = require("../config/config");
const path = require("path");

var mongoose = require('mongoose');
module.exports = {
    createTransaction: createTransaction,
    getTransactions: getTransactions,
    getAllTransaction: getAllTransaction,
    deleteTransaction: deleteTransaction,
    uploadImage: uploadImage,
    updateTransactionWallet: updateTransactionWallet
}

// UPLOAD FILE
function uploadImage(idTransaction, file) {
    return new Promise(function (resolve, reject) {
        file.mv(path.join(__dirname, '../public/images/' + idTransaction + '.png'), function (err) {
            if (err)
                reject(err);
            return transactionModel.findOneAndUpdate({ _id: idTransaction }, { $set: { image: idTransaction + '.png' } })
                .then(function (data) {
                    resolve(`${config.server.domain}:${config.server.port}/images/${idTransaction}.png`);
                })
                .then(function (err) {
                    reject(err);
                })
        });
    });
}

// TẠO RA 1 GIAO DỊCH
function createTransaction(bodyTransaction){
    let transaction = new transactionModel(bodyTransaction);
    return transaction.save()
        .then((transaction) => {
            return Promise.resolve(transaction);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

// LẤY TẤT CẢ CÁC GIAO DỊCH
function getTransactions(idwallet){
    return transactionModel.find({idwallet: idwallet})
        .then((transacrion) => {
            return Promise.resolve(transacrion);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

// LẤY TẤT CẢ TOÀN BỘ GIAO DỊCH
function getAllTransaction(){
    return transactionModel.find()
        .then((transacrion) => {
            return Promise.resolve(transacrion);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

// CHỈNH SỬA GIAO DỊCH 
function updateTransactionWallet(bodyUpdateTransaction){

    let idTransaction = bodyUpdateTransaction._id;
    bodyUpdateTransaction.idwallet = bodyUpdateTransaction.idwalletold;
    // XOÁ GIAO DỊCH
    return transactionModel.findByIdAndRemove(idTransaction)
        .then(() => {
            // TẠO TRANSACTION MỚI
            let newTransaction = new transactionModel(bodyUpdateTransaction);
            return newTransaction.save().then((transaction) => {
                return Promise.resolve(transaction);
            })
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

// XOÁ 1 GIAO DỊCH
function deleteTransaction(idtransaction){
    return transactionModel.findByIdAndRemove(idtransaction)
        .then((transacrion) => {
            return Promise.resolve(transacrion);
        })
}

