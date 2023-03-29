var express = require('express');
var router = express.Router();
var mydb = require('../models');

/* GET save listing. */
router.get('/', function(req, res, next) {
    //get the data from the query of the request
    var user = req.query.username.trim().toLowerCase();
    //delete user from database
    mydb.Github.destroy({
        where: {name: user}
    }).then(v => {
        if(v) {
            res.send({status: "ok"});
        } else {
            res.send({status: "not"});
        }
    }).catch(err => {
        console.log(err.toString());
    });
});

module.exports = router;
