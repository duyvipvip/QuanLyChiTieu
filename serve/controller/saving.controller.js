const savingModel = require("../model/saving.model");
const transactionModel = require("../model/transaction.model");

module.exports = {
    getAllSaving: getAllSaving,
    createSaving: createSaving,
    createSendIn: createSendIn,
    updateSaving: updateSaving,
    deleteSaving: deleteSaving,
    getOnlySaving: getOnlySaving,
    createSendOut: createSendOut,
    useSaving: useSaving
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

// SỬ DỤNG KHOÀN TIẾT KIỆM
function useSaving(bodyUseSaving){
    let objTransactionIn = {
        "groupcategory" : "income",
        "idcategory": "5a7d25bd2504042b8e6be38c",
        "notetransaction" : "Rút ra từ khoản tiết kiệm "+ bodyUseSaving.namesaving,
        "datecreatetransaction" : new Date().toISOString().slice(0, 10),
        "moneytransaction" : bodyUseSaving.moneyTransaction,
        "imagecategory" : "khoanthukhac",
        "categorytransaction" : "Khoản thu khác",
        "idwallet" : bodyUseSaving.idwallet,
        "iduser" : bodyUseSaving.iduser,
        "idsaving": bodyUseSaving._id,
    }
    let objTransactionOut = {
        "idcategory": "5a85892332bdec050bea4894",
        "groupcategory" : "expense",
        "notetransaction" : "Sử dung khoản tiết kiệm "+ bodyUseSaving.namesaving,
        "datecreatetransaction" : new Date().toISOString().slice(0, 10),
        "moneytransaction" : Number.parseInt(bodyUseSaving.moneyTransaction)*-1,
        "imagecategory" : "khoanchikhac",
        "categorytransaction" : "Khoản chi khác",
        "idwallet" : bodyUseSaving.idwallet,
        "iduser" : bodyUseSaving.iduser,
        "idsaving": bodyUseSaving._id,
    }
    let newTransactionIn = new transactionModel(objTransactionIn);
    return newTransactionIn.save()
        .then(() => {
            let newTransactionOut = new transactionModel(objTransactionOut);
            return newTransactionOut.save()
                .then(() => {
                    return savingModel.findOneAndUpdate({_id: bodyUseSaving._id},  { $set: { status: 'true' }})
                        .then((data) => {
                            return Promise.resolve(data);
                        })
                        .catch(function (err) {
                            return Promise.reject(err);
                        })
                })
                .catch(function (err) {
                    return Promise.reject(err);
                })
        }).catch(function (err) {
            return Promise.reject(err);
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

// TẠO MỘT KHOẢN TIẾT KIỆM
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

// XOÁ ĐI MỘT KHOẢN TIẾT KIỆM
function deleteSaving(idSaving) {
    return savingModel.findByIdAndRemove(idSaving)
        .then(function (saving) {
            return transactionModel.remove({idsaving: idSaving})
                .then(() => {
                    Promise.resolve(saving);
                })
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}
