var friendData = require('../data/friends.js');
module.exports = function (app) {
	app.get('/api/friends', function(req, res){
		res.json(friendData);
	})
	app.post('/api/friends', function(req, res){
		var newFriend = req.body;

		for(var i = 0; i < newFriend.scores.length; i++) {
			if(newFriend.scores[i] == "1 (Strongly Disagree)") {
				newFriend.scores[i] = 1;
			} else if(newFriend.scores[i] == "5 (Strongly Agree)") {
				newFriend.scores[i] = 5;
			} else {
				newFriend.scores[i] = parseInt(newFriend.scores[i]);
			}
		}
		var differencesArray = [];
		for(var i = 0; i < friendData.length; i++) {
			var comparedFriend = friendData[i];
			var totalDifference = 0;
			for(var k = 0; k < comparedFriend.scores.length; k++) {
				var differenceOneScore = Math.abs(comparedFriend.scores[k] - newFriend.scores[k]);
				totalDifference += differenceOneScore;
			}
			differencesArray[i] = totalDifference;
		}
		var bestFriendNum = differencesArray[0];
		var bestFriendIndex = 0;
		for(var i = 1; i < differencesArray.length; i++) {
			if(differencesArray[i] < bestFriendNum) {
				bestFriendNum = differencesArray[i];
				bestFriendIndex = i;
			}
		}
		friendData.push(newFriend);
		res.json(friendData[bestFriendIndex]);
	})
}




// // Load Data
// var friendData = require('../data/friends.js');

// // Routing
// module.exports = function (app) {

// 	// API GET requests. below code handles when users "visit" a page.
// 	app.get('/api/friends', function(req, res){
// 		res.json(friendData);
// 	});

// 	// API POST requests. below code handel when a user submits a form and thus submit data to the server
// 	var newFriend;
// 	// var scores function();

// 	app.post('/api/friends', function(req, res){
// 		var newFriend = req.body;
// 		res.json(true);
// 	});

// 	for(var i = 0; i < friendData.length; i++) {
//         if(newFriend.scores[i] == "1 (Strongly Disagree)") {
//             newFriend.scores[i] = 1;
//         } else if(newFriend.scores[i] == "5 (Strongly Agree)") {
//             newFriend.scores[i] = 5;
//         } else {
//             newFriend.scores[i] = parseInt(newFriend.scores[i]);
//         }
//         console.log("Friend Score: " + newFriend.scores[i]);
//     }
//     var differencesArray = [];
//     for(var i = 0; i < friendData.length; i++) {
//         var comparedFriend = friendData[i];
//         var totalDifference = 0;
//         for(var k = 0; k < comparedFriend.scores.length; k++) {
//             var differenceOneScore = Math.abs(comparedFriend.scores[k] - newFriend.scores[k]);
//             totalDifference += differenceOneScore;
//             console.log("Total diffrence: " + differencesArray[i]);
//         }
//         differencesArray[i] = totalDifference;
//     }
//     var bestFriendNum = differencesArray[0];
//     var bestFriendIndex = 0;
//     for(var i = 1; i < differencesArray.length; i++) {
//         if(differencesArray[i] < bestFriendNum) {
            
//             bestFriendNum = differencesArray[i];
//             bestFriendIndex = i;
//         }
//     }
//     friendData.push(newFriend);
//     console.log("New Friend: " + newFriend);
//     res.json(friendData[bestFriendIndex]);
    
//     $.post("/api/friends", newFriend,
//     function(data) {
//   console.log("Your friend match is ");
//       // If a survey is match... tell user they match.
//       if (data) {
//         alert("Your friend match is ");
//       }

//       // If a table is not match to any friend.
//       else {
//         alert("Sorry no frined to match this time.");
//       }
//     });

//     console.log("Your friend match is ");






// 	app.post("../api/clear", function(req, res) {
// 		// Empty out the arrays of data
// 		newFriend.scores.length = [];
// 		res.json({ ok: true });
// 	  });
// 	};
	

		