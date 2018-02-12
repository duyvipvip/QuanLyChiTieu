const router = require("express").Router();
const savingTransactionController = require("../controller/savingtransaction.controller");

router.post("/savingtransaction/create", createSavingTransaction);
router.delete("/savingtransaction/delete", deleteSavingTransaction);
router.post("/savingtransaction/update", updateSavingTransaction)
module.exports = router;

// TẠO MỚI MỘT GIAO DỊCH BÊN TRONG KHOẢN TIẾT KIỆM
function createSavingTransaction(req, res, next){
    let bodySavingTransaction = req.body;
    savingTransactionController.createSavingTransaction(bodySavingTransaction)
        .then((savingTransaction) => {
            res.json({
                data: savingTransaction
            })
        })
        .catch((err) => {
            res.send(err);
        })
}

// XOÁ MỘT GIAO DỊCH BÊN TRONG KHOẢN TIẾT KIỆM
function deleteSavingTransaction(req, res, next){
    let bodySavingTransaction = req.body;
    savingTransactionController.deleteSavingTransaction(bodySavingTransaction)
        .then((savingTransaction) => {
            res.json({
                data: savingTransaction
            })
        })
        .catch((err) => {
            res.send(err);
        })
}

// CẬP NHẬT MỘT GIAO DICH BÊN TRONG KHOẢN TIẾT KIỆM
function updateSavingTransaction(req, res, next){
    let bodySavingTransaction = req.body;
    savingTransactionController.updateSavingTransaction(bodySavingTransaction)
        .then((savingTransaction) => {
            res.json({
                data: savingTransaction
            })
        })
        .catch((err) => {
            res.send(err);
        })
}