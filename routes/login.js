var express = require('express');
var router = express.Router();
var mydb = require('../models');

/* GET login listing. */
router.get('/', function(req, res, next) {
    //redirect to index
    res.redirect('/');
});

/* POST login listing. */
router.post('/', function(req, res, next) {
    //get the data from the body request
    var user = req.body.username.trim().toLowerCase();
    var pswd = req.body.password.trim().toLowerCase();
    //find the user in database
    mydb.Users.findOne({
        where: {username: user}
    }).then(v => {
        //if exist check th password and id it correct connect him and create cookie
        if(v) {
            if (v.username === user && v.password === pswd) {
                res.cookie('username', user, {maxAge: 604800000});
                res.redirect('/');
            } else {
                //if the password wrong render message
                res.render('index', {myFlag: 2, message: "Wrong password."});
            }
        } else {
            //if user not exist render message
            res.render('index', {myFlag: 2, message: "User not register."});
        }
    }).catch(err => {
        console.log(err.toString())
    });
});

module.exports = router;
