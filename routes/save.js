var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();
var mydb = require('../models');

/* GET save listing. */
router.get('/', function(req, res, next) {
    //get the username from the query of the request
    var user = req.query.username.trim().toLowerCase();
    if(user === ""){
        res.send({status: "github", details:""});
    }
    //check if it already in the database
    mydb.Github.findOne({
        where: {name: user}
    }).then(v => {
        if(v){
            //send the user exist
            res.send({status: "exist", details:""});
        } else {
            //check if the user exist in github
            fetch("https://api.github.com/users/"+user)
                .then(function (response) {
                    //check the status of the response
                    if (response.status >= 200 && response.status < 300) {
                        //if the status ok add the user to database
                        mydb.Github.create({
                            name: user,
                            url: 'https://github.com/' + user
                        }).then(v => {
                            //send the link to dom list
                            var jRes = {
                                status: "ok",
                                details: "<li id='" + user + "'><a href='https://github.com/" + user + "' target='_blank'>" + user + "</a></li>"
                            };
                            res.send(jRes);
                        }).catch(err => {
                            console.log(err.toString());
                        });
                    } else if (response.status === 404) {
                        //send the error to dom
                        res.send({status: "github", details:""});
                    } else {
                        res.send({status: "error",
                            details: Promise.reject(new Error(response.statusText))});
                    }
                }).catch(function (err) {
                    console.log(err);
                });
        }
    }).catch(err => {
        console.log(err.toString());
    });
});

module.exports = router;
