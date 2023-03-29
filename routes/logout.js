var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //get the cookie named username from the request
    var userCookie = req.cookies['username'];
    //check if it not null
    if(userCookie) {
        //delete the cookie
        res.clearCookie('username');
        //redirect to index
        res.redirect('/');
    }
});

module.exports = router;
