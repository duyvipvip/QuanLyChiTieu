
const userModel = require("../model/user.model");

module.exports = {
    createSavingTransaction: createSavingTransaction,
    deleteSavingTransaction: deleteSavingTransaction,
    updateSavingTransaction: updateSavingTransaction,
}

// TẠO MỘT NGÂN SÁCH TIẾT KIỆM
function createSavingTransaction(bodyTransaction){
    let objUpdateSaving = {
        "notetransaction": bodyTransaction.notetransaction,
        "moneytransaction": 1000,
        "idwallet": bodyTransaction.idwallet,
        "detecttransaction": bodyTransaction.detecttransaction
    }
   
    return userModel.update(
        {
            _id: bodyTransaction.iduser ,"savings._id": bodyTransaction.idsaving
        },
        {
            $push: {"savings.$.transaction": objUpdateSaving}
        }
    )
        .then((user) => {
            return Promise.resolve(user);
        })
        .catch((err) =>{
            return Promise.reject(err);
        })
}

// XOÁ MỘT KHOẢN TIẾT KIỆM
function deleteSavingTransaction(bodyTransaction){
    return userModel.update(
        {
            _id: bodyTransaction.iduser, "savings._id": bodyTransaction.idsaving, "savings.transaction._id": bodyTransaction.idtransaction
        },{
            $pull: { 
                "savings.$.transaction": { _id: bodyTransaction.idtransaction }
            }
        },
    )
        .then((user) => {
            return Promise.resolve(user);
        })
        .catch((err) =>{
            return Promise.reject(err);
        })
}

// CHỈNH SỬA MỘT KHOẢN TIẾT KIỆM
function updateSavingTransaction(bodyTransaction){
    return userModel.findOneAndUpdate(
        {
            _id: bodyTransaction.iduser, "savings._id": bodyTransaction.idsaving, "savings.transaction._id": bodyTransaction.idtransaction
        },{
            $set: {
                "savings.$[i].transaction.$[j].notetransaction" : bodyTransaction.notetransaction,
                "savings.$[i].transaction.$[j].moneytransaction" : bodyTransaction.moneytransaction,
                "savings.$[i].transaction.$[j].detecttransaction" : bodyTransaction.detecttransaction,
                "savings.$[i].transaction.$[j].idwallet" : bodyTransaction.idwallet,
            }
        },
    )
        .then((user) => {
            return Promise.resolve(user);
        })
        .catch((err) =>{
            return Promise.reject(err);
        })
}

