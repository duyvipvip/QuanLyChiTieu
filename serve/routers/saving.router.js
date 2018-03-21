const router = require("express").Router();
const savingController = require("../controller/saving.controller");
const auth = require("../middle-ware/auth");

router.get("/all", getAllSaving);
router.get("/only", getOnlySaving);
// router.get("/get/:id", getSavingById);
router.post("/create", auth.auth() , createSaving);
router.post("/update", auth.auth(), updateSaving);
router.post("/createSendIn",auth.auth(), createSendIn);
router.post("/createSendOut",auth.auth(), createSendOut);
// router.delete("/saving/delete/:id", deleteSaving);

//transaction
// router.post("/transaction/create", createTranSaction);

//wallets
// router.get("/wallets/get", getWallets)
module.exports = router;

// LẤY 1 KHOẢN TIẾT KIỆM
function getOnlySaving(req, res, next){
    let idsaving = req.query.idsaving;
    if (!idsaving) {
        next({
            statusCode: 400,
            message: "id saving is required"
        })
    }else{
        savingController.getOnlySaving(idsaving)
            .then(function (transaction) {
                res.send(transaction);
            })
            .catch(function (err) {
                next(err);
            })
    }
}

// GỬI TIỀN VÀO KHOẢN TIẾT KIỆM
function createSendIn(req, res, next){
    // var iduser = req.query.iduser;
    var bodySendIn = req.body;
    bodySendIn.iduser = req.user[0]._id;
    if (!bodySendIn.iduser) {
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }if (!bodySendIn.namesaving) {
        next({
            statusCode: 400,
            message: "name saving is required"
        })
    }if (!bodySendIn.money) {
        next({
            statusCode: 400,
            message: "Money is required"
        })
    }if (!bodySendIn.date) {
        next({
            statusCode: 400,
            message: "date is required"
        })
    }if (!bodySendIn.idwallet) {
        next({
            statusCode: 400,
            message: "id wallet is required"
        })
    }if (!bodySendIn.idsaving) {
        next({
            statusCode: 400,
            message: "id saving is required"
        })
    }else{
        savingController.createSendIn(bodySendIn)
        .then(function (transaction) {
            res.send(transaction);
        })
        .catch(function (err) {
            next(err);
        })
    }
}

// RÚT TIỀN TỪ KHOẢN TIẾT KIỆM
function createSendOut(req, res, next){
    var bodySendOut = req.body;
    bodySendOut.iduser = req.user[0]._id;
    if (!bodySendOut.iduser) {
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }if (!bodySendOut.namesaving) {
        next({
            statusCode: 400,
            message: "name saving is required"
        })
    }if (!bodySendOut.money) {
        next({
            statusCode: 400,
            message: "Money is required"
        })
    }if (!bodySendOut.date) {
        next({
            statusCode: 400,
            message: "date is required"
        })
    }if (!bodySendOut.idwallet) {
        next({
            statusCode: 400,
            message: "id wallet is required"
        })
    }if (!bodySendOut.idsaving) {
        next({
            statusCode: 400,
            message: "id saving is required"
        })
    }else{
        savingController.createSendOut(bodySendOut)
        .then(function (transaction) {
            res.send(transaction);
        })
        .catch(function (err) {
            next(err);
        })
    }
}

// get saving / user
function getAllSaving(req, res, next) {
    let iduser = req.query.iduser;
    if (!iduser) {
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else{
        savingController.getAllSaving(iduser)
        .then(function (savings) {
            res.send(savings);
        })
        .catch(function (err) {
            next(err);
        })
    }
   
}

// get saving by id
function getSavingById(req, res, next) {
    var idsaving = req.params.id;
    if (!idsaving) {
        next({
            statusCode: 400,
            message: "id saving is required"
        })
    }else{
        savingController.getSavingById(idsaving)
        .then(function (saving) {
            res.send(saving);
        })
        .catch(function (err) {
            next(err);
        })
    }
}

// create a saving
function createSaving(req, res, next) {
    var bodySaving = req.body;
    bodySaving.iduser = req.user[0]._id;
    if(!bodySaving.namesaving){
        next({
            statusCode: 400,
            message: "name saving is required"
        })
    }else if(!bodySaving.iduser){
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else if(!bodySaving.moneyend){
        next({
            statusCode: 400,
            message: "money end is required"
        })
    }else if(!bodySaving.enddate){
        next({
            statusCode: 400,
            message: "date end is required"
        })
    }else if(!bodySaving.image){
        next({
            statusCode: 400,
            message: "image is required"
        })
    }else{
        savingController.createSaving(bodySaving)
        .then(function (saving) {
            res.json(saving);
        })
        .catch(function (err) {
            next(err);
        })
    }
    
}

// CHỈNH SỬA SAVING
function updateSaving(req, res, next) {
    let bodySaving = req.body;
    return savingController.updateSaving(bodySaving)
        .then(function (saving) {
            res.send(saving)
        })
        .catch(function (err) {
            next(err)
        })
    }

// delete a saving
function deleteSaving(req, res, next) {
    var idsaving = req.params.id;
    if(!idsaving){
        next({
            statusCode: 400,
            message: "id saving is required"
        })
    }else{
        savingController.deleteSaving(idsaving)
        .then(function (saving) {
            res.send(saving)
        })
        .catch(function (err) {
            next(err);
        })
    }
   
}

function createTranSaction(req, res, next) {

    var bodyTranSaction = req.body;
    savingController.createTranSaction(bodyTranSaction)
        .then(function (transaction) {
            res.json(transaction);
        })
        .catch(function (err) {
            res.send(err);
        })
}

// get Wallet for UserId
function getWallets(req, res, next) {
    var userid = "5a98ac95d38f7b7c9aebd1f3";
    savingController.getWalletByUserId(userid)
        .then(function (wallets) {
            res.send(wallets);
        })
        .catch(function (err) {
            res.next(err);
        })
}