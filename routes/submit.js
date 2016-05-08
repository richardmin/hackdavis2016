var express = require('express');
var router = express.Router();
var myFirebaseRef = new Firebase("https://hackdavis2016.firebaseio.com/");


function analyze(req)
{
	//as of may 7, 2016
	//solarcity services: Arizona, California, Colorado, 
						//Connecticut, Delaware, Hawaii,
						// Maryland, Massachusetts, Nevada, 
						// New Jersey, New York, Oregon, 
						// Pennsylvania, Texas, Washington and Washington D.C

	//sunrun services: Arizona, California, Colorado, 
						// Conneticut, Delaware, Hawaii,
						// Maryland, Massachusetts, New Hampshire, 
						// New Jersey, New York, Oregon, 
						// Pennsylvania, and South Carolina

	// sungevity services California, Colorado, Conneticut
						// Delaware, District of Columbia, Maryland
						// Massachusets, New Jersey, New Mexico, New York
						// North Carolina, Rhode Island, Vermont
	var states = ["AZ", "CA", "CO", "CT", "DE", "DC", "HI", "MD", "MA", "NV", "NH", "NJ", "NM", "NY", "NC", "OR", "PA", "RI", "SC", "TX", "VT", "WA"];
	var points = 0;
	if(req.State != "" && states.indexOf(req.State) > -1) //state is in one of those serviced by solarcity, sunrun, or sungetivity => means that it's probably cheap/money making
		points += 50;
	

	if(req.affiliation == "Worker")
	{
		points += 10;
	}
	else if(req.affiliation == "Board")
	{
		points += 7;
	}
	else if(req.affiliation == "Volunteer")
	{
		points += 3;
	}

	
	if(req.people != "") //make sure there's a people count
	{
		var toAdd;
		if(req.people < 100) // few people
			toAdd = -10;
		else
			toAdd = req.people/1000; //otherewise we scale it down
		if(toAdd > 30)
			toAdd = 30;
		console.log("toAdd: " + toAdd);
		points += toAdd;
	}
	

	if(req.building=="Yes") //own own building
	{
		points += 20;
	}

	if(req['roof-age'] > 10 && req.replace!="Yes")
		points -= 300; //big problem
	
	if(req.length < 1)
		points = null; //if you don't have it for a year, you need to come back later.


	if(req.year != "")
	{
		var toAdd = (2016 - req.year)/10;;
		if(toAdd > 10)
			toAdd = 10;
		points += toAdd;
	}

	if(req.history=="Yes")
		points += 10;

	if(req.efficiency=="Yes")
		points += 5;
	return points;
}


router.post('/', function(req, res)
{
	var ref = 
	res.render('submit', {title: 'Nom'});
	var points = analyze(req.body)
	var myval = myFirebaseRef.push({data: req.body, 'points': points, 'seen': false});
	
	myval.update({ "data/startedAt": Firebase.ServerValue.TIMESTAMP}); //time since unix epoch
	// myval.update({ "points" : points}); //time since unix epoch
	console.log(req.body);
	console.log(points);
});

router.get('/', function(req, res)
{
	res.render('error', {
    message: "Please don't refresh this page.",
    error: {}
  });
});

module.exports = router;
