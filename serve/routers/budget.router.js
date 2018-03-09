const router = require("express").Router();
const auth = require("../middle-ware/auth");
const bugetController = require("../controller/budget.controller");

router.post('/create', auth.auth() , createBudget);
router.post('/update', updateBudget);
router.post('/delete', deleteBudget);
router.get('/all', getBudgets);
router.get('/only', getBudget);

module.exports = router;

// TẠO MỚI MỘT NGÂN SÁCH
function createBudget(req, res, next){
    let bodyBudget = req.body;
    bodyBudget.iduser = req.user[0]._id;
    
    if (!bodyBudget.idcategory) {
        next({
            statusCode: 400,
            message: "id category is required"
        })
    }else if(!bodyBudget.imagecategory){
        next({
            statusCode: 400,
            message: "image category is required"
        })
    }else if(!bodyBudget.namecategory){
        next({
            statusCode: 400,
            message: "name category is required"
        })
    }else if(!bodyBudget.targetmoney){
        next({
            statusCode: 400,
            message: "target money is required"
        })
    }else if(!bodyBudget.datestart){
        next({
            statusCode: 400,
            message: "date start is required"
        })
    }else if(!bodyBudget.dateend){
        next({
            statusCode: 400,
            message: "date end is required"
        })
    }else if(!bodyBudget.idwallet){
        next({
            statusCode: 400,
            message: "id wallet is required"
        })
    }else if(!bodyBudget.iduser){
        next({
            statusCode: 400,
            message: "image category is required"
        })
    }else{
        bugetController.createBudget(bodyBudget)
        .then((buget) => {
            res.send(buget);
        })
        .catch((err) => {

        })
    }
   
}

// CHỈNH SỬA MỘT NGÂN SÁCH
function updateBudget(req, res, next){
    let bodyBudget = req.body;
    if (!bodyBudget.idcategory) {
        next({
            statusCode: 400,
            message: "id category is required"
        })
    }else if(!bodyBudget.namecategory){
        next({
            statusCode: 400,
            message: "name category is required"
        })
    }else if(!bodyBudget.targetmoney){
        next({
            statusCode: 400,
            message: "target money is required"
        })
    }else if(!bodyBudget.datestart){
        next({
            statusCode: 400,
            message: "date start is required"
        })
    }else if(!bodyBudget.dateend){
        next({
            statusCode: 400,
            message: "date end is required"
        })
    }else if(!bodyBudget.idbudget){
        next({
            statusCode: 400,
            message: "id budget is required"
        })
    }else{
        bugetController.updateBudget()
        .then((buget) => {
            res.send(buget);
        })
        .catch((err) => {
        })
    }
}

// XOÁ MỘT NGÂN SÁCH
function deleteBudget(req, res, next){
    let idbudget = req.body.idbudget;
    bugetController.deleteBudget(idbudget)
        .then((buget) => {
            res.send(buget);
        })
        .catch((err) => {
            next(err);
        })
}

// LẤY TẤT CẢ CÁC NGÂN SÁCH
function getBudgets(req, res, next){
    let iduser = req.query.iduser;
    if (!iduser) {
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else{
        bugetController.getBudgets()
            .then((buget) => {
                res.send(buget);
            })
            .catch((err) => {
                next(err);
            })
    }
    
}

// LẤY MỘT NGÂN SÁCH
function getBudget(req, res, next){
    let idbudget = req.query.idbudget;
    if (!idbudget) {
        next({
            statusCode: 400,
            message: "id category is required"
        })
    }else{
        bugetController.getBudget(idbudget)
        .then((buget) => {
            res.send(buget);
        })
        .catch((err) => {
            next();
        })
    }
   
}