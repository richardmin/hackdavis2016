var express = require('express');
var router = express.Router();

router.post('/', function(req, res)
{
	res.render('submit');
	console.log(req.body);
	console.log("asdf");
});

module.exports = router;
