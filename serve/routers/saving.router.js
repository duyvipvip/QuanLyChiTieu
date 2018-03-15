const router = require("express").Router();
const savingController = require("../controller/saving.controller");

router.get("/get", getSaving);
router.get("/saving/get/:id", getSavingById);
router.post("/create", createSaving);
router.put("/saving/update/:id", updateSaving);
router.delete("/saving/delete/:id", deleteSaving);


//transaction
router.post("/transaction/create", createTranSaction);

//wallets
router.get("/wallets/get", getWallets)
module.exports = router;

// get saving / user

function getSaving(req, res, next) {
    var userid = req.query.userid;
    if (!userid) {
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else{
        savingController.getSaving(userid)
        .then(function (savings) {
            res.send(savings.savings);
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
    if(!bodySaving.namesaving){
        next({
            statusCode: 400,
            message: "name saving is required"
        })
    }else if(!bodySaving.namesaving){
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else if(!bodySaving.walletid){
        next({
            statusCode: 400,
            message: "id wallet is required"
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

function updateSaving(req, res, next) {

    var id = req.params.id;
    if(!id){
        next({
            statusCode: 400,
            message: "id saving is required"
        })
    }else{
        var saving = req.body;
        saving._id = id;
        return savingController.updateSaving(saving)
            .then(function (saving) {
                res.send(saving)
            })
            .catch(function (err) {
                next(err)
            })
    }
    
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