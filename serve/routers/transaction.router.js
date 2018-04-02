const router = require("express").Router();
const transactionController = require("../controller/transaction.controller");
const auth = require("../middle-ware/auth");

router.post("/create", auth.auth() , createTransaction);
router.get("/all", getTransactions);
router.post("/image", auth.auth(), uploadImage);
router.post("/delete", auth.auth(), deleteTransaction);
router.post("/update", auth.auth(), updateTransactionWallet);
router.delete("/deleteTransactionToTime/:time", auth.auth(), deleteTransactionToTime);
router.get("/alltransaction/:iduser", getAllTransaction);
module.exports = router;

// XOÁ TẤT CẢ CÁC GIAO DỊCH CÓ CÙNG TIME
function deleteTransactionToTime(req, res, next){
    let iduser = req.user[0]._id;
    let time = req.params.time;
    if(!iduser){
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else if(!time){
        next({
            statusCode: 400,
            message: "time is required"
        })
    }else{
        transactionController.deleteTransactionToTime(time)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            next(err);
        })
    }
}

// UPLOAD FILE
function uploadImage(req, res, next){
    let idtransaction = req.query.idtransaction;
    let file = req.files.file;;
    let iduser = req.user[0]._id;
    
    if(!iduser){
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else if(!idtransaction){
        next({
            statusCode: 400,
            message: "id transaction is required"
        })
    }else if(!file){
        next({
            statusCode: 400,
            message: "file is required"
        })
    }else{
        
        transactionController.uploadImage(idtransaction, file)
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                next(err);
            });
    }

}

// TẠO MỘT GIAO DỊCH CHO MỘT VÍ
function createTransaction(req, res, next){
    let transaction = req.body;
    transaction.iduser = req.user[0]._id;
    if(!transaction.idcategory){
        next({
            statusCode: 400,
            message: "id category is required"
        })
    }else if (!transaction.iduser) {
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else if (!transaction.categorytransaction) {
        next({
            statusCode: 400,
            message: "category transaction is required"
        })
    }else if(!transaction.imagecategory){
        next({
            statusCode: 400,
            message: "image category is required"
        })
    }else if(!transaction.moneytransaction){
        next({
            statusCode: 400,
            message: "money transaction is required"
        })
    }else if(!transaction.datecreatetransaction){
        next({
            statusCode: 400,
            message: "date create transaction is required"
        })
    }else if(!transaction.idwallet){
        next({
            statusCode: 400,
            message: "id wallet is required"
        })
    }else if(!transaction.groupcategory){
        next({
            statusCode: 400,
            message: "group category is required"
        })
    }else{
        transactionController.createTransaction(transaction)
            .then((transaction) => {
                res.send(transaction)
            })
            .catch((err) => {
                next(err);
            });
    }
}
// LẤY TOÀN BỘ GIAO DỊCH
function getAllTransaction(req, res, next){
    let iduser = req.params.iduser;
    if(!iduser){
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else{
        transactionController.getAllTransaction(iduser)
        .then((wallet) => {
            res.send(wallet)
        })
        .catch((err) => {
            next(err);
        });
    }
   
}
// LẤY TẤT CẢ CÁC GIAO DỊCH CỦA MỘT VÍ
function getTransactions(req, res, next){
    let idwallet = req.query.idwallet;
    if (!idwallet) {
        next({
            statusCode: 400,
            message: "id wallet is required"
        })
    }else{
        transactionController.getTransactions(idwallet)
        .then((wallet) => {
            res.send(wallet)
        })
        .catch((err) => {
            next(err);
        });
    }
   
}

// UPDATE GIAO DỊCH VÍ
function updateTransactionWallet(req, res, next){
    let transaction = req.body;
    transaction.iduser = req.user[0]._id;
    if(!transaction.idcategory){
        next({
            statusCode: 400,
            message: "id category is required"
        })
    }else if (!transaction.idwalletold) {
        next({
            statusCode: 400,
            message: "id wallet old is required"
        })
    }else if(!transaction.idwallet){
        next({
            statusCode: 400,
            message: "id wallet is required"
        })
    }else if(!transaction._id){
        next({
            statusCode: 400,
            message: "id transaction is required"
        })
    }else if(!transaction.groupcategory){
        next({
            statusCode: 400,
            message: "group category is required"
        })
    }else if(!transaction.datecreatetransaction){
        next({
            statusCode: 400,
            message: "date create transaction is required"
        })
    }else if(!transaction.moneytransaction){
        next({
            statusCode: 400,
            message: "money transaction is required"
        })
    }else if(!transaction.imagecategory){
        next({
            statusCode: 400,
            message: "imagecategory is required"
        })
    }else if(!transaction.categorytransaction){
        next({
            statusCode: 400,
            message: "category transaction is required"
        })
    }else{
        transactionController.updateTransactionWallet(transaction)
        .then((result) =>{
            res.send(result);
        })
        .catch((err) => {
            next(err);
        })
    }
    
}

// XOÁ MỘT GIAO DỊCH
function deleteTransaction(req, res, next){
    let idtransaction = req.body.idtransaction;
    if(!idtransaction){
        next({
            statusCode: 400,
            message: "id transaction is required"
        })
    }else{
        transactionController.deleteTransaction(idtransaction)
        .then((data) =>{
            res.send(data);
        })
        .catch((err) => {
            next(err);
        })
    }
   
}