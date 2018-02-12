const router = require("express").Router();
const debtLoanController = require("../controller/debt-loan.controller");

router.get("/debt-loan", getAllDebtLoan);
module.exports = router;

function getAllDebtLoan(req, res, next){
    debtLoanController.getAllDebtloan()
        .then((income) => {
            res.json({data: income});
        })
        .catch((err) => {
            res.json(err);
        })
}