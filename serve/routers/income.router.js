const router = require("express").Router();
const incomeController = require("../controller/income.controller");
const auth = require("../middle-ware/auth");

router.get('/', getAllIncome);
router.post('/',auth.auth(), addIncome);
router.post('/delete', auth.auth(), removeInCome);
router.post("/image",auth.auth(), uploadImage);

module.exports = router;

function removeInCome(req, res, next){
    let idincome = req.query.idincome;
    let iduser = req.user[0]._id;
    if(!iduser){
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else if(!idincome){
        next({
            statusCode: 400,
            message: "id income is required"
        })
    }else{
        incomeController.removeInCome(idincome)
        .then((income) => {
            res.json(income);
        })
        .catch((err) => {
            res.json(err);
        })
    }
}

function getAllIncome(req, res, next){
    let iduser = req.query.iduser;
    if(!iduser){
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else{
        incomeController.getAllIncome(iduser)
        .then((income) => {
            res.json({data: income});
        })
        .catch((err) => {
            res.json(err);
        })
    }
    
}
function uploadImage(req, res, next){
    let iduser = req.user[0]._id;
    let idincome = req.query.idincome;
    let file = req.files.file;;
    
    if(!file){
        next({
            statusCode: 400,
            message: "file is required"
        })
    }else if(!iduser){
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else if(!idincome){
        next({
            statusCode: 400,
            message: "id income is required"
        })
    }else{
        incomeController.uploadImage(idincome, file)
        .then((income) => {
            res.json({data: income});
        })
        .catch((err) => {
            res.json(err);
        })
    }
}
function addIncome(req, res, next){
    let body = req.body;
    body.iduser = req.user[0]._id;
    if(!body.iduser){
        next({
            statusCode: 400,
            message: "id user is required"
        })
    }else{
        incomeController.addIncome(body)
        .then((income) => {
            res.json(income);
        })
        .catch((err) => {
            res.json(err);
        })
    }
    
}

