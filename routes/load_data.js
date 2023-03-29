var express = require('express');
var router = express.Router();
var mydb = require('../models');

/* GET load list. */
router.get('/', function(req, res, next) {
    //get all the records from the database
    mydb.Github.findAll().then(v => {
        //put all the records on string named saved
        var saved = "";
        for(var e of v){
            saved += "<li id='" + e.name + "'><a href='"+ e.url + "' target='_blank'>" + e.name + "</a></li>";
        }
        //send to view
        res.send({
            status: "ok",
            list: saved

        });
    }).catch(err => {
        console.log(err.toString());
    });
});

module.exports = router;
