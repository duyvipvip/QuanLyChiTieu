const walletModel = require("../model/wallet.model");
const transactionModel = require("../model/transaction.model");


module.exports = {
    getAllWallet: getAllWallet,
    getWalletToIdWallet: getWalletToIdWallet,
    deleteWallet: deleteWallet,
    addWallet: addWallet,
    updateWallet: updateWallet,
}

// LẤY TẤT CẢ CÁC VÍ
function getAllWallet(iduser){
   return walletModel.find({iduser: iduser})
        .then((wallet) => {
            return Promise.resolve(wallet);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

// LẤY VÍ CÓ ID LÀ 
function getWalletToIdWallet( iduser , idwallet){
    return walletModel.findById({_id: idwallet, iduser: iduser})
        .populate({ path: 'transactions', select: 'imagecategory categorytransaction iduser moneytransaction datecreatetransaction taguser idwallet notetransaction groupcategory' })
        .then((wallet) => {
            return Promise.resolve(wallet);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

// XOÁ ĐI 1 VÍ
function deleteWallet(iduser, idwallet){
    return walletModel.findOneAndRemove({_id: idwallet, iduser: iduser})
        .then((wallet) => {
            return Promise.resolve(wallet);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

// THÊM MỘT VÍ
function addWallet(body){
    let newWallet = new walletModel(body);
    return newWallet.save()
        .then((wallet) => {
            if(body.money > 0){
                let objTransaction = {
                    "groupcategory" : "income",
                    "notetransaction" : "Số tiền hiện có",
                    "datecreatetransaction" : new Date(),
                    "moneytransaction" : body.money,
                    "imagecategory" : "khoanthukhac",
                    "categorytransaction" : "Khoản thu khác",
                    "idwallet" : wallet._id,
                    "iduser" : body.iduser,
                    "taguser" : [],
                }
                let newTransaction = new transactionModel(objTransaction);
                return newTransaction.save().then((transaction) => {
                    return Promise.resolve(wallet);
                })
            }else{
                return Promise.resolve(wallet);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

// CHỈNH SỬA 1 VÍ
function updateWallet(wallet){
    let moneyEdit = wallet.money;
    let obj = {
        "namewallet" : wallet.namewallet,
        "iduser" : wallet.iduser
    }
    let totalMoney =0;
    
    return walletModel.findByIdAndUpdate({_id: wallet._id}, obj )
        .then((wallet) => {
            transactionModel.find({idwallet: wallet._id})
                .then((transactions) => {
                    transactions.forEach((transaction) => {
                        totalMoney += Number.parseInt(transaction.moneytransaction);
                    })
                    let remainMoney = (moneyEdit - totalMoney );
                    let objTransaction = {
                        "groupcategory" : "income",
                        "notetransaction" : "Điều chỉnh số dư",
                        "datecreatetransaction" : new Date(),
                        "moneytransaction" : remainMoney,
                        "imagecategory" : "khoanthukhac",
                        "categorytransaction" : "Khoản thu khác",
                        "idwallet" : wallet._id,
                        "iduser" : obj.iduser,
                        "taguser" : [],
                    }
                    if(remainMoney > 0){
                        let newTransaction = new transactionModel(objTransaction);
                        return newTransaction.save().then((transaction) => {
                            return Promise.resolve(wallet);
                        })
                    }else if(remainMoney < 0){
                        objTransaction.groupcategory = "expense";
                        objTransaction.imagecategory = "khoanchikhac";
                        objTransaction.categorytransaction = "Khoản chi khác";
                        
                        let newTransaction = new transactionModel(objTransaction);
                        return newTransaction.save().then((transaction) => {
                            return Promise.resolve(wallet);
                        })
                    }
                    return Promise.resolve(wallet);
                })
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}