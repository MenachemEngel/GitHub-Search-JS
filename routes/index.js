var express = require('express');
var router = express.Router();
var mydb = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  //get from request cookie named username
  var userCookie = req.cookies['username'];
  //check if it not null
  if(userCookie){
    //if not null render flag with 1 for load the search page
    res.render('index', {myFlag: 1, message: userCookie});
  }else{
    //if null render flag with 2 for load the login page
    res.render('index', {myFlag: 2, message: ""});
  }
});

module.exports = router;
