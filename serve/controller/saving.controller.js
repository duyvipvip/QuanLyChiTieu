const savingModel = require("../model/saving.model");
const transactionModel = require("../model/transaction.model");

module.exports = {
    getAllSaving: getAllSaving,
    getSavingById: getSavingById,
    createSaving: createSaving,
    createSendIn: createSendIn,
    updateSaving: updateSaving,
    deleteSaving: deleteSaving,
    getOnlySaving: getOnlySaving,
    createSendOut: createSendOut
    // getTransaction: getTransaction,
    // getATransaction:getATransaction,
    // createTransaction: createTransaction,
    // updateTransaction: updateTransaction,
    // deleteTransaction: deleteTransaction,

    // getWalletByUserId: getWalletByUserId
}
// LẤY 1 KHOẢN TIẾT KIỆM
function getOnlySaving(idsaving){
    return savingModel.findById(idsaving)
        .then((saving) => {
            return Promise.resolve(saving);
        })
}
// GỬI VÀO KHOẢN TIẾT KIỆM
function createSendIn(bodySendIn){
    let objTransaction = {
        "idcategory": "5a85892332bdec050bea4894",
        "groupcategory" : "expense",
        "notetransaction" : "Gửi vào khoản tiết kiệm "+ bodySendIn.namesaving,
        "datecreatetransaction" : bodySendIn.date,
        "moneytransaction" : Number.parseInt(bodySendIn.money)*-1,
        "imagecategory" : "khoanchikhac",
        "categorytransaction" : "Khoản chi khác",
        "idwallet" : bodySendIn.idwallet,
        "iduser" : bodySendIn.iduser,
        "taguser" : [],
        "idsaving": bodySendIn.idsaving,
    }
    let newSendIn = new transactionModel(objTransaction);
    return newSendIn.save()
        .then((transaction) => {
            return Promise.resolve(transaction);
        })
}

// GỬI VÀO KHOẢN TIẾT KIỆM
function createSendOut(bodySendOut){
    let objTransaction = {
        "groupcategory" : "income",
        "idcategory": "5a7d25bd2504042b8e6be38c",
        "notetransaction" : "Rút ra từ khoản tiết kiệm "+ bodySendOut.namesaving,
        "datecreatetransaction" : bodySendOut.date,
        "moneytransaction" : Number.parseInt(bodySendOut.money),
        "imagecategory" : "khoanthukhac",
        "categorytransaction" : "Khoản thu khác",
        "idwallet" : bodySendOut.idwallet,
        "iduser" : bodySendOut.iduser,
        "idsaving": bodySendOut.idsaving,
    }
    let newSendOut = new transactionModel(objTransaction);
    return newSendOut.save()
        .then((transaction) => {
            return Promise.resolve(transaction);
        })
}
// LẤY TẤT CẢ CÁC SAVING
function getAllSaving(iduser) {
    return savingModel.find({iduser: iduser})
        .then(function (savings) {
            return Promise.resolve(savings);
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

// get saving / id saving
function getSavingById(id) {
    return Saving.findById(id)
        .populate({
            path: 'transactions',
            select: 'moneytransaction'
        })
        .then(function (saving) {
            return Promise.resolve(saving);
        })
        .catch(function (err) {
            return Promise.reject(err);
        })

}

// create the saving
function createSaving(bodySaving) {
    var saving = new savingModel(bodySaving);
    return saving.save()
        .then(function (saving) {
            return Promise.resolve(saving);
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}
// CẬP NHẬT SAVING
function updateSaving(saving) {
    return savingModel.findOneAndUpdate({ _id: saving._id }, saving)
        .then(function (saving) {
            return Promise.resolve(saving);
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

// delete a saving
function deleteSaving(id) {
    return Saving.findByIdAndRemove(id)
        .then(function (saving) {
            return Promise.resolve(saving);
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

// // transaction
// function getTransaction(id) {
//     return Saving.findById(id)
//         .populate({
//             path: 'transactions',
//         })
//         .then(function (saving) {
//             // if (saving.transactions)
//                 return Promise.resolve(saving.transactions);
//         })
//         .catch(function (err) {
//             return Promise.reject(err);
//         })
// }

// // get a transaction
// function getATransaction(id) {
//     return Transaction.findById(id)
//         .then(function (transaction) {
//             return Promise.resolve(transaction);
//         })
//         .catch(function (err) {
//             return Promise.reject(err);
//         })
// }

// function createTransaction(data) {
//     var transaction = new Transaction(data);
//     return Saving.findById(transaction.savingid)
//         .then(function (saving) {
//             saving.transactions.push(transaction._id);
//             return saving.save()
//                 .then(function () {
//                     return transaction.save()
//                         .then(function () {
//                             return Promise.resolve(transaction);
//                         })
//                         .catch(function (err) {
//                             return Promise.reject(err);
//                         })
//                 })
//         })
// }

// function updateTransaction(transaction) {
//     return Transaction.findOneAndUpdate({ _id: transaction._id }, transaction)
//         .then(function (tran) {
//             return Promise.resolve(tran);
//         })
//         .catch(function (err) {
//             return Promise.reject(err);
//         })
// }

// function deleteTransaction(id) {
//     return Saving.findOne({ 'transactions': id })
//         .then(function (saving) {
//             saving.transactions.forEach(transaction => {
//                 if (transaction == id) {
//                     // transaction.splice
//                 }
//             });
//             return saving.save()
//                 .then(function () {
//                     return Transaction.findByIdAndRemove(id)
//                         .then(function (transaction) {
//                             return Promise.resolve(transaction);
//                         })
//                         .catch(function (err) {
//                             return Promise.resolve(err);
//                         })
//                 })
//                 .catch(function (err) {
//                     return Promise.reject(err);
//                 })
//         })
//         .catch(function (err) {
//             return Promise.reject(err);
//         })
// }

// function getWalletByUserId(id) {
//     return User.findById(id)
//         .populate({
//             path: 'wallets',
//             select: '_id namewallet money',

//         })
//         .then(function (user) {
//             return Promise.resolve(user.wallets);
//         })
//         .catch(function (err) {
//             return Promise.reject(err);
//         })
// }

// function test(body) {
//     return User.findById(iduser)
//         .populate({
//             path: 'savings'
//         })
//         .then(function (user) {
//             return Promise.resolve(user.savings);
//         })
// }