var User = require("../model/user.model");
var Saving = require("../model/saving.model");
var Wallet = require("../model/wallet.model");
module.exports = {
    getSaving: getSaving,
    getSavingById: getSavingById,
    createSaving: createSaving,
    updateSaving: updateSaving,
    deleteSaving: deleteSaving,

    createTranSaction: createTranSaction,

    getWalletByUserId:getWalletByUserId
}

// get savings / user
function getSaving(id) {
    console.log(id);
    return User.findById(id)
        .populate({
            path: 'savings'
        })
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
        .then(function (saving) {
            return Promise.resolve(saving);
        })
        .catch(function (err) {
            return Promise.reject(err);
        })

}

// create the saving
function createSaving(bodySaving) {
    var saving = new Saving(bodySaving);
    return saving.save()
        .then(function (saving) {
            return User.findById(saving.userid)
                .then(function (user) {
                    user.savings.push(saving._id);
                    return User.findByIdAndUpdate({_id: user._id}, user)
                        .then(function () {
                            return Promise.resolve(saving);
                        })
                        .catch(function (err) {
                            return Promise.reject(err);
                        })
                })
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}

// update a saving
function updateSaving(saving) {
    return Saving.findOneAndUpdate({ _id: saving._id }, saving)
        // return Saving.update({_id:saving._id},saving)
        .then(function (saving) {
            // console.log(saving);
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

// transaction
function createTranSaction(data) {
    var transaction = new Transaction(data);
    return Wallet.findById(transaction.walletid).then(function(wallet){
        if(transaction.isGetIn==true){
            if(transaction.money>wallet.money){
                console.log("không đủ tiền");
            }
            else{
                wallet.money = wallet.money - transaction.money;
                
            }
        }
        else if(transaction.isGetIn==false){
            wallet.money = wallet.money + transaction.money;
        }
        return wallet.save()
        .then(function () {
            console.log('thanh cong');
            return Promise.resolve(wallet);
        })
        .catch(function (err) {
            console.log('loi');
            return Promise.reject(err);
        })
    })  
}

function getWalletByUserId(id){
    return User.findById(id)
    .populate({
        path: 'wallets',
        select: '_id namewallet'
        // .populate({

        // })
    })
    .then(function (user) {
        return Promise.resolve(user.wallets);
    })
    .catch(function (err) {
        return Promise.reject(err);
    })
}