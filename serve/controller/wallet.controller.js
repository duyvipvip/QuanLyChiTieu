const walletModel = require("../model/wallet.model");

module.exports = {
    getAllWallet: getAllWallet,
    getOnlyWalletId: getOnlyWalletId,
    deleteWallet: deleteWallet,
    addWallet: addWallet,
    updateWallet: updateWallet,
}

// LẤY TẤT CẢ CÁC VÍ
function getAllWallet(){
   return walletModel.find({})
        .then((wallet) => {
            return Promise.resolve(wallet);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

// LẤY VÍ CÓ ID LÀ 
function getOnlyWalletId(id){
    return walletModel.findById({_id: id})
        .then((wallet) => {
            return Promise.resolve(wallet);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

// XOÁ ĐI 1 VÍ
function deleteWallet(id){
    return walletModel.findByIdAndRemove({_id: id})
        .then((wallet) => {
            return Promise.resolve(wallet);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

// THÊM MỘT VÍ
function addWallet(body){
    let wallet = new walletModel(body);
    return wallet.save()
        .then((wallet) => {
            return Promise.resolve(wallet);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

// CHỈNH SỬA 1 VÍ
function updateWallet(wallet){
    return walletModel.findByIdAndUpdate({_id: wallet._id}, wallet )
        .then((wallet) => {
            return Promise.resolve(wallet);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}