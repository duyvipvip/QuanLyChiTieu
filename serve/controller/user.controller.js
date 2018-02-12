const userModel = require("../model/user.model");

module.exports = {
    createUser: createUser,
    getAllUser: getAllUser
}

function createUser(newUer){
    newUer = new userModel(newUer);
    return newUer.save()
        .then((newUer) => {
            return Promise.resolve(newUer);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}

function getAllUser(){
    return userModel.find()
        .then((user) => {
            return Promise.resolve(user);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}