var express = require('express');
var router = express.Router();

router.post('/', function(req, res)
{

	res.render('submit', {title: 'Nom'});
	console.log(req.body);
	console.log("asdf");
});

router.get('/', function(req, res)
{
	res.render('error', {
    message: "Please don't refresh this page.",
    error: {}
  });
	console.log("asdf");
});

module.exports = router;
