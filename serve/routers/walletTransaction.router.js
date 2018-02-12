const router = require("express").Router();
const walletTransactionController = require("../controller/wallettransaction.controller");

router.post("/wallettransaction/create", createWalletTransaction);
router.get("/wallettransaction/getonly/:idWallet", getTransactionToIDWallet)
module.exports = router;

// TẠO MỘT GIAO DỊCH CHO MỘT VÍ
function createWalletTransaction(req, res, next){
    let bodyWalletTransaction = req.body;
    walletTransactionController.createWalletTransaction(bodyWalletTransaction)
        .then((wallet) => {
            res.send(wallet)
        })
        .catch((err) => {

        });
}

// LẤY TẤT CẢ CÁC GIAO DỊCH CỦA MỘT VÍ
function getTransactionToIDWallet(req, res, next){
    let idWallet = req.params.idWallet;
    walletTransactionController.getTransactionToIDWallet(idWallet)
        .then((wallet) => {
            res.send(wallet)
        })
        .catch((err) => {

        });
}