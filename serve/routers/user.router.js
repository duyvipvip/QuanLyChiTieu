const router = require("express").Router();
const userController = require('../controller/user.controller');

router.post("/user/create", createUser );
router.get("/user/getall", getAllUser );
module.exports = router;

function createUser(req, res, next){
    userController.createUser(req.body)
        .then((user) => {
            res.json({
                data: user,
            })
        })
        .catch((err) => {
            res.send(err);
        })
}

function getAllUser(req, res, next){
    userController.getAllUser()
        .then((user) => {
            res.json({
                data: user,
            })
        })
        .catch((err) => {
            res.send(err);
        })
}