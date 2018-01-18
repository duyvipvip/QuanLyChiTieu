var router  = require('express').Router();
var data = require('./data');

router.get('/people', getPeople);

// XUẤT ROUTER RA
module.exports = router;

function getPeople(req, res, next){
    res.status(200).send(data.people);
}

