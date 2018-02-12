const router = require("express").Router();
const savingController = require("../controller/saving.controller");

router.post("/saving/create", createSaving);
router.post("/saving/update", updateSaving);
router.delete("/saving/delete", deleteSaving);
module.exports = router;

// TẠO MỘT NGÂN SÁCH TIẾT KIỆM
function createSaving(req, res, next){
    let bodySaving = req.body;
    savingController.createSaving(bodySaving)
        .then((saving) => {
            res.json({
                data: saving
            })
        })
        .catch((err) => {
            res.send(err);
        })
}


// CHỈNH SỬA NGÂN SÁCH TIẾT KIỆM
function updateSaving(req, res, next){
    let bodySaving = req.body;
    savingController.updateSaving(bodySaving)
        .then((saving) => {
            res.json({
                data: saving
            })
        })
        .catch((err) => {
            res.send(err);
        })
}

// XOÁ NGÂN SÁCH TIẾT KIỆM
function deleteSaving(req, res, next){
    let bodySaving = req.body;
    savingController.deleteSaving(bodySaving)
        .then((saving) => {
            res.json({
                data: saving
            })
        })
        .catch((err) => {
            res.send(err);
        })
}