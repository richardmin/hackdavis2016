var express = require('express');
var router = express.Router();
var myFirebaseRef = new Firebase("https://hackdavis2016.firebaseio.com/");


router.post('/', function(req, res)
{
	var ref = 
	res.render('submit', {title: 'Nom'});
	var myval = myFirebaseRef.push({data: req.body});
	myval.update({ "data/startedAt": Firebase.ServerValue.TIMESTAMP}); //time since unix epoch
	console.log(myval);
});

router.get('/', function(req, res)
{
	res.render('error', {
    message: "Please don't refresh this page.",
    error: {}
  });
});

module.exports = router;
