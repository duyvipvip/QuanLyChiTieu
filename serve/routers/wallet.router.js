const router = require('express').Router();
const walletController = require('../controller/wallet.controller');
const auth = require("../middle-ware/auth");

// LẤY HIẾT TẤT CẢ CÁC VÍ
router.get("/all", getAllWallet);
router.get("/only", getWalletToIdWallet);
router.post("/delete",auth.auth(), deleteWallet);
router.put("/create", auth.auth() , addWallet);
router.post("/update",auth.auth(), updateWallet);
module.exports = router;

function getAllWallet(req, res, next){
    let iduser = req.query.iduser;
    if (!iduser) {
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else{
        walletController.getAllWallet(iduser)
        .then((wallet) => {
            res.json(wallet);
        })
        .catch((err) => {
            next(err);
        })
    }   
    
}

function getWalletToIdWallet(req, res, next){
    let iduser = req.query.iduer;
    let idwallet = req.query.idwallet;
    if (!iduser) {
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else if(!idwallet){
        next({
            statusCode: 400,
            message: "id wallet is required"
        })
    }else{
        walletController.getWalletToIdWallet(iduser, idwallet)
        .then((wallet) => {
            res.send(wallet);
        })
        .catch((err) => {
            next(err);
        })
    }
    
}

function deleteWallet(req, res, next){
    let idwallet = req.body.idwallet;
    let iduser = req.user[0]._id;;
    if (!iduser) {
        res.send({
            statusCode: 400,
            message: "id user is required"
        })
    }else if(!idwallet){
        res.send({
            statusCode: 400,
            message: "id wallet is required"
        })
    }else{
        walletController.deleteWallet(iduser , idwallet)
        .then((wallet) => {
            res.send(wallet);
        })
        .catch((err) => {
            next(err);
        })
    }

   
}

function addWallet(req, res, next){
    let wallet = req.body;
    wallet.iduser = req.user[0]._id;
    if (!wallet.namewallet) {
        next({
            statusCode: 400,
            message: "name wallet is required"
        })
    }else if(!wallet.money){
        next({
            statusCode: 400,
            message: "money wallet is required"
        })
    }else if(!wallet.iduser){
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else{
        walletController.addWallet(wallet)
        .then((wallet) => {
            res.send(wallet)
        })
        .catch((err) => {
            next(err);
        })
    }
    
}

function updateWallet(req, res, next){
    let wallet = req.body;
    wallet.iduser = req.user[0]._id;

    if (!wallet.namewallet) {
        next({
            statusCode: 400,
            message: "name wallet is required"
        })
    }else if(!wallet.money){
        next({
            statusCode: 400,
            message: "money wallet is required"
        })
    }else if(!wallet.iduser){
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else{
        walletController.updateWallet(wallet)
            .then((wallet) => {
                res.send(wallet)
            })
            .catch((err) => {
                next(err);
            })
    }
}