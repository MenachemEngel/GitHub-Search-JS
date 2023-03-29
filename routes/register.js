var express = require('express');
var router = express.Router();
var mydb = require('../models');

/* GET register listing. */
router.get('/', function(req, res, next) {
    //redirect to index
    res.redirect('/');
});

/* POST register listing. */
router.post('/', function(req, res, next) {
    //get the data from the body of request
    var user = req.body.username.trim().toLowerCase();
    var pswd = req.body.password.trim().toLowerCase();
    //check if the user is already exist in the database
    mydb.Users.findOne({
        where: {username: user}
    }).then(v => {
        if(v) {
            res.render('index', {myFlag: 2, message: "User already registered."});
        } else {
            //add user to database
            mydb.Users.create({
                username: user,
                password: pswd
            });
            res.render('index' ,{myFlag: 2, message: "Registered completed"});
        }
    }).catch(err => {
        console.log(err.toString());
    });
});

module.exports = router;
