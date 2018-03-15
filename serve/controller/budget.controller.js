const budgetSchema = require('../model/budget.model');

module.exports = {
    createBudget: createBudget,
    updateBudget: updateBudget,
    deleteBudget: deleteBudget,
    getBudgets: getBudgets,
    getBudget: getBudget,
}

// TẠO MỚI MỘT NGÂN SÁCH
function createBudget(bodybudget){
    budgetNew = new budgetSchema(bodybudget);
    return budgetNew.save()
        .then((budget) => {
            return Promise.resolve(budget);
        })
        .catch((err) =>{
            return Promise.reject(err);
        })
}

// CHỈNH SỬA MÔT NGÂN SÁCH
function updateBudget(bodybudget){
    let objUpdate = {
        "idwallet": bodybudget.idwallet,
        "iduser": bodybudget.iduser,
        "imagecategory": bodybudget.imagecategory,
        "idcategory": bodybudget.idcategory,
        "namecategory": bodybudget.namecategory,
        "targetmoney": bodybudget.targetmoney,
        "datestart": bodybudget.datestart,
        "dateend": bodybudget.dateend
    }
    budgetNew = new budgetSchema();
    return budgetSchema.findByIdAndUpdate({_id:bodybudget._id}, objUpdate)
        .then((budget) => {
            return Promise.resolve(budget);
        })
        .catch((err) =>{
            return Promise.reject(err);
        })
}


// XOÁ MỘT NGÂN SÁCH
function deleteBudget(_id){
    return budgetSchema.findByIdAndRemove({_id : _id})
    .then((budget) => {
        
        return Promise.resolve(budget);
    })
    .catch((err) =>{
        return Promise.reject(err);
    })
}

// LẤY TẤT CẢ CÁC NGÂN SÁCH
function getBudgets(iduser){
    return budgetSchema.find()
        .then((budget) => {
            return Promise.resolve(budget);
        })
        .catch((err) =>{
            return Promise.reject(err);
        })
}

// LẤY MỘT NGÂN SÁCH
function getBudget(idbudget){
    return budgetSchema.findOne({_id: idbudget})
        .then((budget) => {
            return Promise.resolve(budget);
        })
        .catch((err) =>{
            return Promise.reject(err);
        })
}