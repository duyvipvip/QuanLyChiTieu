const router = require("express").Router();
const incomeController = require("../controller/income.controller");

router.get('/income', getAllIncome);

module.exports = router;

function getAllIncome(req, res, next){
    incomeController.getAllIncome()
        .then((income) => {
            res.json({data: income});
        })
        .catch((err) => {
            res.json(err);
        })
}

