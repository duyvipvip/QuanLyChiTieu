const walletModel = require("../model/wallet.model");
var mongoose = require('mongoose');
module.exports = {
    createWalletTransaction: createWalletTransaction,
    getTransactionToIDWallet: getTransactionToIDWallet
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
        {
            _id: bodyWalletTransaction.idwallet
        },
        {
            $push: {
                transactions: objUpdateWalletTransaction
            }
        })
        .then((wallet) => {
            
            return Promise.resolve(wallet);
        })
        .catch((err) =>{
            return Promise.reject(err);
        })
}

// TRUYỀN VÀO MỘT ID VÍ LẤY TẤT CẢ CÁC GIAO DỊCH CỦA VÍ ĐÓ
function getTransactionToIDWallet(idWallet){
    return walletModel.find({ _id: idWallet })
        .then((data) => {
            data[0].transactions.sort(function(a,b){
                return new Date(b.datecreatetransaction) - new Date(a.datecreatetransaction);
            });
            return Promise.resolve(data);
            
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

function formatArrayWalletTransaction(walletTransaction){
    let newArrWalletTransaction = [];
    for(let i =0; i< walletTransaction.length; i++){
        if(newArrWalletTransaction.length == 0){
            newArrWalletTransaction.push(new Array(walletTransaction[i]));
        }else{
            for(let j =0; j< newArrWalletTransaction.length; j++){
                if(new Date(walletTransaction[i].datecreatetransaction).getDate() == new Date(newArrWalletTransaction[j][0].datecreatetransaction).getDate()){
                    newArrWalletTransaction[j]['ngay'] = "duy";
                    newArrWalletTransaction[j].push(walletTransaction[i]);
                }else{
                    newArrWalletTransaction.push(new Array(walletTransaction[i]));
                    break;
                }
                
            }
        }
    }
   
    return newArrWalletTransaction;
}