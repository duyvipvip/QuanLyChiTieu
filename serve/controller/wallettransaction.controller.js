const walletModel = require("../model/wallet.model");
var mongoose = require('mongoose');
module.exports = {
    createWalletTransaction: createWalletTransaction,
    getTransactionToIDWallet: getTransactionToIDWallet,
    updateTransactionWallet: updateTransactionWallet,
    removeTransactionWallet: removeTransactionWallet
}

// TẠO RA 1 GIAO DỊCH CHO MỘT VÍ
function createWalletTransaction(bodyWalletTransaction){
    let objUpdateWalletTransaction = {
        "categorytransaction": bodyWalletTransaction.categorytransaction,
        "imagecategory": bodyWalletTransaction.imagecategory,
        "moneytransaction": bodyWalletTransaction.moneytransaction,
        "datecreatetransaction": bodyWalletTransaction.datecreatetransaction,
        "taguser": bodyWalletTransaction.taguser,
        "notetransaction": bodyWalletTransaction.notetransaction,
        "idwallet": bodyWalletTransaction.idwallet,
        "groupcategory": bodyWalletTransaction.groupcategory,
    }
    return walletModel.findOneAndUpdate(
        { _id: bodyWalletTransaction.idwallet },
        { $push: { transactions: objUpdateWalletTransaction }})
        .then((wallet) => {
            
            return Promise.resolve(wallet);
        })
        .catch((err) =>{
            return Promise.reject(err);
        })
}

// TRUYỀN VÀO MỘT ID VÍ LẤY TẤT CẢ CÁC GIAO DỊCH CỦA VÍ ĐÓ
function getTransactionToIDWallet(idWallet){
    let find = {};
    if(idWallet != null && idWallet != '' && idWallet != undefined){
        find = {
            _id: idWallet
        }
    }
    
    return walletModel.find(find)
        .then((data) => {
            
            return Promise.resolve(data);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

// CHỈNH SỬA GIAO DỊCH CỦA 1 VÍ
function updateTransactionWallet(bodyUpdateTransaction){
    let idWalletOld = bodyUpdateTransaction.idwalletold;
    let idWalletnew = bodyUpdateTransaction.idwallet;
    let idTransaction = bodyUpdateTransaction._id

    let objUpdateTransaction = {
        "groupcategory" : bodyUpdateTransaction.groupcategory,
        "notetransaction" : bodyUpdateTransaction.notetransaction,
        "idwallet" : idWalletnew,
        "datecreatetransaction" : bodyUpdateTransaction.datecreatetransaction,
        "moneytransaction" : bodyUpdateTransaction.moneytransaction,
        "imagecategory" : bodyUpdateTransaction.imagecategory,
        "categorytransaction" : bodyUpdateTransaction.categorytransaction,
        "taguser" : bodyUpdateTransaction.taguser
    }
    return walletModel.update({ _id: idWalletOld, "transactions._id": idTransaction },{ $pull: { "transactions": { _id: idTransaction }}},)
        .then((user) => {
            return walletModel.update({ _id: idWalletnew },{ $push: {"transactions": objUpdateTransaction}})
                .then((user) => {
                    return Promise.resolve(user);
                })
                .catch((err) =>{
                    return Promise.reject(err);
                })
        })
        .catch((err) =>{
            return Promise.reject(err);
        })
}

// XOÁ 1 GIAO DỊCH
function removeTransactionWallet(bodyRemoveTransaction){
    let idwallet = bodyRemoveTransaction.idwallet;
    let idtransaction = bodyRemoveTransaction.idtransaction
    return walletModel.update({ _id: idwallet, "transactions._id": idtransaction },{ $pull: { "transactions": { _id: idtransaction }}},)
        .then((user) => {
            return Promise.resolve(user);
        })
        .catch((err) =>{
            return Promise.reject(err);
        })
}
