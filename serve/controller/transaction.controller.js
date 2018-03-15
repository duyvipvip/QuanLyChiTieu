const transactionModel = require("../model/transaction.model");
const walletModel = require("../model/wallet.model");

var mongoose = require('mongoose');
module.exports = {
    createTransaction: createTransaction,
    getTransactions: getTransactions,
    getAllTransaction: getAllTransaction,
    deleteTransaction: deleteTransaction,
    updateTransactionWallet: updateTransactionWallet
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
    let idWalletOld = bodyUpdateTransaction.idwalletold;
    let idWalletnew = bodyUpdateTransaction.idwallet;
    let idTransaction = bodyUpdateTransaction._id;
    
    let objTransaction = {
        "idwallet" : idWalletnew,
        "idcategory": bodyUpdateTransaction.idcategory,
        "iduser": bodyUpdateTransaction.iduser,
        "groupcategory" : bodyUpdateTransaction.groupcategory,
        "notetransaction" : bodyUpdateTransaction.notetransaction,
        "datecreatetransaction" : bodyUpdateTransaction.datecreatetransaction,
        "moneytransaction" : bodyUpdateTransaction.moneytransaction,
        "imagecategory" : bodyUpdateTransaction.imagecategory,
        "categorytransaction" : bodyUpdateTransaction.categorytransaction,
        "taguser" : bodyUpdateTransaction.taguser
    }

    // XOÁ GIAO DỊCH
    transactionModel.findByIdAndRemove(idTransaction)
        .then((transacrion) => {
            // TẠO TRANSACTION MỚI
            let newTransaction = new transactionModel(objTransaction);
            return newTransaction.save().then((transaction) => {
                return Promise.resolve(transaction);
            })
        })
}

// XOÁ 1 GIAO DỊCH
function deleteTransaction(idtransaction){
    transactionModel.findByIdAndRemove(idtransaction)
    .then((transacrion) => {
        return Promise.resolve(transacrion);
    })
}

