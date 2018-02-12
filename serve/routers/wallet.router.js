const router = require('express').Router();
const walletController = require('../controller/wallet.controller');

// LẤY HIẾT TẤT CẢ CÁC VÍ
router.get("/wallet", getAllWallet);
router.get("/wallet/:id", getOnlyWalletId);
router.delete("/wallet/delete/:id", deleteWallet);
router.put("/wallet/add", addWallet);
router.post("/wallet/update/:id", updateWallet);
module.exports = router;

function getAllWallet(req, res, next){
    walletController.getAllWallet()
        .then((wallet) => {
            res.json(wallet)
        })
        .catch((err) => {

        })
}

function getOnlyWalletId(req, res, next){
    walletController.getOnlyWalletId(req.params.id)
        .then((wallet) => {
            res.send(wallet)
        })
        .catch((err) => {

        })
}

function deleteWallet(req, res, next){
    walletController.deleteWallet(req.params.id)
        .then((wallet) => {
            res.send(wallet)
        })
        .catch((err) => {

        })
}

function addWallet(req, res, next){
    walletController.addWallet(req.body)
        .then((wallet) => {
            res.send(wallet)
        })
        .catch((err) => {

        })
}

function updateWallet(req, res, next){
    let id = req.params.id;
    let wallet = req.body;
    wallet._id = id;

    walletController.updateWallet(wallet)
        .then((wallet) => {
            res.send(wallet)
        })
        .catch((err) => {

        })
}