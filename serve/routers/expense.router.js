const router = require('express').Router();
const expenseController = require('../controller/expense.controller');

router.get('/expense', getAllExpense);
module.exports = router;

function getAllExpense(req, res, next){
    expenseController.getAllExpense()
        .then((income) => {
            res.json({data: income});
        })
        .catch((err) => {
            res.json(err);
        })
}