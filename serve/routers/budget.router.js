const router = require("express").Router();
const bugetController = require("../controller/budget.controller");

router.post('/wallet/createbudget', createBudget);
module.exports = router;

function createBudget(req, res, next){
    let bodyBudget = req.body;
    bugetController.createBudget()
        .then((wallet) => {
            res.send(wallet);
        })
        .catch((err) => {

        })
}