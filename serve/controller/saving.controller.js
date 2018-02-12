
const userModel = require("../model/user.model");

module.exports = {
    createSaving: createSaving,
    updateSaving: updateSaving,
    deleteSaving: deleteSaving
}

// TẠO MỘT NGÂN SÁCH TIẾT KIỆM
function createSaving(bodySaving){
    let objUpdateSaving = {
        "namesaving": bodySaving.namesaving,
        "moneyend": bodySaving.moneyend,
        "enddate": bodySaving.enddate,
    }
    return userModel.findOneAndUpdate({_id: bodySaving.iduser}, {$push: {savings: objUpdateSaving}})
        .then((user) => {
            return Promise.resolve(user);
        })
        .catch((err) =>{
            return Promise.reject(err);
        })
}

// CHỈNH SỬA NGÂN SÁCH TIẾT KIỆM
function updateSaving(bodySaving){
    // let objUpdateSaving = "";
    // for(item in bodySaving){
    //     if(item != 'iduser' && item != 'idsaving'){
    //         objUpdateSaving += `"savings.$.${item}" : "${bodySaving[item]}"`;
    //     }
    // }
    // console.log(objUpdateSaving);
    return userModel.findOneAndUpdate(
        { _id: bodySaving.iduser, "savings._id": bodySaving.idsaving},
        {
            $set: {
                "savings.$.namesaving" : bodySaving.namesaving,
                "savings.$.moneyend" : bodySaving.moneyend,
                "savings.$.enddate" : bodySaving.enddate,
            }
        }
    )
        .then((user) => {
            return Promise.resolve(user);
        })
        .catch((err) =>{
            return Promise.reject(err);
        })
}

// XOÁ NGÂN SÁCH TIẾT KIỆM
function deleteSaving(bodySaving){
    return userModel.update(
        { _id: bodySaving.iduser, "savings._id": bodySaving.idsaving},
        {
            $pull: { 
                "savings": { _id: bodySaving.idsaving }
            }
        }
    )
        .then((user) => {
            return Promise.resolve(user);
        })
        .catch((err) =>{
            return Promise.reject(err);
        })
}


