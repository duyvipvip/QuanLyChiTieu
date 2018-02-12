
const mongoose = require("mongoose");
const incomeModel = require("../model/income.model");

module.exports = {
    getAllIncome: getAllIncome
}

function getAllIncome(){
    return incomeModel.find()
        .then((income) => {
            return Promise.resolve(income);
        })
        .catch((err) => {
            return Promise.reject(err);
        })
}