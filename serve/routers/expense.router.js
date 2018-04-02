const router = require('express').Router();
const expenseController = require('../controller/expense.controller');

const auth = require("../middle-ware/auth");

router.get('/', getAllExpense);
router.post('/', auth.auth(), addExpense);
router.post('/delete', auth.auth(), removeExpense);
router.post("/image", auth.auth(), uploadImage);

module.exports = router;

function removeExpense(req, res, next){
    let idexpense = req.query.idexpense;
    let iduser = req.user[0]._id;
    if(!iduser){
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else if(!idexpense){
        next({
            statusCode: 400,
            message: "id expense is required"
        })
    }else{
        expenseController.removeExpense(idexpense)
        .then((expense) => {
            res.json(expense);
        })
        .catch((err) => {
            res.json(err);
        })
    }
}

function getAllExpense(req, res, next) {
    let iduser = req.query.iduser;
    if (!iduser) {
        next({
            statusCode: 400,
            message: "id user is required"
        })
    } else {
        expenseController.getAllExpense(iduser)
            .then((income) => {
                res.json({ data: income });
            })
            .catch((err) => {
                res.json(err);
            })
    }
}

function uploadImage(req, res, next) {
    let iduser = req.user[0]._id;
    let idexpense = req.query.idexpense;
    let file = req.files.file;;

    if (!file) {
        next({
            statusCode: 400,
            message: "file is required"
        })
    } else if (!iduser) {
        next({
            statusCode: 400,
            message: "id user is required"
        })
    } else if (!idexpense) {
        next({
            statusCode: 400,
            message: "id idexpense is required"
        })
    } else {
        expenseController.uploadImage(idexpense, file)
            .then((income) => {
                res.json({ data: income });
            })
            .catch((err) => {
                res.json(err);
            })
    }
}

function addExpense(req, res, next) {
    let body = req.body;
    body.iduser = req.user[0]._id;
    if (!body.iduser) {
        next({
            statusCode: 400,
            message: "id user is required"
        })
    } else {
        expenseController.addExpense(body)
            .then((income) => {
                res.json(income);
            })
            .catch((err) => {
                res.json(err);
            })
    }
}