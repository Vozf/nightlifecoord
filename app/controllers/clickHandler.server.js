'use strict';

var Users = require('../models/users.js');
var options = require("../controllers/yelp.js");
var yelp = require("node-yelp");
var client = yelp.createClient({
	oauth: options,
});

function ClickHandler() {

	this.getClicks = function(req, res) {
		Users
			.findOne({
				'github.id': req.user.github.id
			}, {
				'_id': false
			})
			.exec(function(err, result) {
				if (err) {
					throw err;
				}

				res.json(result.nbrClicks);
			});
	};

	this.addClick = function(req, res) {
		Users
			.findOneAndUpdate({
				'github.id': req.user.github.id
			}, {
				$inc: {
					'nbrClicks.clicks': 1
				}
			})
			.exec(function(err, result) {
				if (err) {
					throw err;
				}

				res.json(result.nbrClicks);
			});
	};

	this.resetClicks = function(req, res) {
		Users
			.findOneAndUpdate({
				'github.id': req.user.github.id
			}, {
				'nbrClicks.clicks': 0
			})
			.exec(function(err, result) {
				if (err) {
					throw err;
				}

				res.json(result.nbrClicks);
			});
	};
	this.getSearch = function(req, res) {
		try {
			client.search({
				terms: "bar",
				location: req.params.txt,
			}).then(function(data) {

				var businesses = data.businesses.slice(0, 10);
				var out = [];
				businesses.forEach(function(val) {
					out.push({
						name: val.name,
						img: val.image_url,
						location: val.location.city,
						phone: val.phone,
						url: val.url
					})
				});
				//var location= data.region;
				//console.log(out);
				res.json((out));

				// ...  
			});
		}
		catch (err) {
			console.log(err);
		}
	}
	this.addComin=function(req,res){
		var name= req.params.txt;
		console.log("add");
		Users.find({'github.id': req.user.github.id,places:{$all:[name]}}).exec(function(err, result) {
				if (err) {
					throw err;
				}
				//console.log(result);

				if(result.length===0)
					Users.findOneAndUpdate({'github.id': req.user.github.id}, {$push: {"places": name}}).exec(function(err, result) {
						if (err) {
							
								throw err;
						}
					//	console.log(countByPlace(name));
					Users.count({places:{$all:[name]}},function(err,count){
						res.end(count.toString());
					});
					});
				else
					Users.findOneAndUpdate({'github.id': req.user.github.id}, {$pull: {"places": name}}).exec(function(err, result) {
						if (err) {
								throw err;
						}	
					//	console.log(result);
					Users.count({places:{$all:[name]}},function(err,count){
						res.end(count.toString());
					});
	
						
					});

			});

			
	}
	this.count=function(req,res){
		//console.log(Users.find({places:{$all:[place]}}).count());
					Users.count({places:{$all:[req.params.txt]}},function(err,count){
						res.end(count.toString());
					});
	}

}

module.exports = ClickHandler;
