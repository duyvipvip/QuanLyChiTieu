const router = require("express").Router();
const walletTransactionController = require("../controller/wallettransaction.controller");

router.post("/wallettransaction/create", createWalletTransaction);
router.get("/wallettransaction/getonly", getTransactionToIDWallet)
router.post("/wallettransaction/update", updateTransactionWallet);
router.post("/wallettransaction/remove", removeTransactionWallet);
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
    let idWallet = req.query.idWallet;
    
    walletTransactionController.getTransactionToIDWallet(idWallet)
        .then((wallet) => {
            res.send(wallet)
        })
        .catch((err) => {

        });
}

// UPDATE GIAO DỊCH VÍ
function updateTransactionWallet(req, res, next){
    let bodyUpdateTransaction= req.body;
    walletTransactionController.updateTransactionWallet(bodyUpdateTransaction)
        .then((data) =>{
            res.send(data);
        })
        .catch((err) => {

        })
}

// XOÁ MỘT GIAO DỊCH
function removeTransactionWallet(req, res, next){
    let bodyRemoveTransaction= req.body;
    walletTransactionController.removeTransactionWallet(bodyRemoveTransaction)
        .then((data) =>{
            res.send(data);
        })
        .catch((err) => {

        })
}