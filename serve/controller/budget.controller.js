const walletModel = require('../model/wallet.model');

module.exports = {
    createBudget: createBudget,
}

function createBudget(bodybudget){
    let objUpdateBudget = {
        "name": bodybudget.name,
        "money": bodybudget.money,
        "datestart": bodybudget.datestart,
        "dateend": bodybudget.dateend,
        "idwallet": bodybudget.idwallet,
    }
    return walletModel.findOneAndUpdate(
        { _id: bodybudget.idwallet },
        { $push: { budgets: objUpdateBudget }})
        .then((wallet) => {
            return Promise.resolve(wallet);
        })
        .catch((err) =>{
            return Promise.reject(err);
        })
}