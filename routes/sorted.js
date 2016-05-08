var express = require('express');
var router = express.Router();
var async = require("async");
var myFirebaseRef = new Firebase("https://hackdavis2016.firebaseio.com/");

function sortResults(obj, prop, asc) {
    obj = obj.sort(function(a, b) {
        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
    showResults();
}


router.get('/', function(req, res)
{
	
	
	myFirebaseRef.orderByChild("points").once("value", function(snapshot) {
	  // console.log("HOI IM TEM");
	  // console.log(snapshot.val());
	  var d = "";
	  snapshot.forEach(function(snp) {
	  	// console.log("nom");
	  	// console.log(snp.val());
	  	d = JSON.stringify(snp.val().data) + "," + d;
	  });
	  d = "[" + d
	  d = d.slice(0, -1);
	  d = d + "]"
	  console.log(JSON.parse(d));

	  res.render('sorted', {
  	    data: JSON.parse(d)
  	  });
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});

});


module.exports = router;