var userdata = require('../data/friends.js');

var path = require('path');

module.exports = function (app) {

	function sumOfArr(arr) {   //Adds all values inside any array passed into this function

		total = 0;
		for (a = 0; a < arr.length; a++) {

			total = total + parseInt(arr[a]);
		}
	 return total;
	}


	app.get('/api/friends', function (req,res) {

		res.json(userdata);
	});


	app.post('/api/friends', function(req, res){
 
		  userdata.push(req.body);

		  newUserScore = sumOfArr(req.body.scores);

		  leadingScore = 100; 

		  bestMatch = userdata[0]; 

		  // LOGIC FOR OBTAINING BEST MATCH

		  for (i = 0; i < userdata.length - 1; i++) {  //length - 1 used to not check user against themselves

		  	 currentComparison = sumOfArr(userdata[i].scores) - newUserScore;

		  	 	if (currentComparison < 0) {
		  	 	
		  	 	currentComparison = currentComparison * (-1);
		  	 		
		  	 		}
		   
		  if (currentComparison < leadingScore){

		  		leadingScore = currentComparison;

		  		bestMatch = userdata[i];

		   }

		

		 }
		
		  res.json(bestMatch);

	});



};