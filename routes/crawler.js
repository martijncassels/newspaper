var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var MongoClient = require('mongodb').MongoClient
var parser = Promise.promisifyAll(require('rss-parser'));

var Articles = require('../models/articles.js');

// router.get('/test', function(req, res, next) {

// 	MongoClient.connect('mongodb://martijn:D33g-roll3r@cluster0-shard-00-00-7ij4y.mongodb.net:27017,cluster0-shard-00-01-7ij4y.mongodb.net:27017,cluster0-shard-00-02-7ij4y.mongodb.net:27017/newspaper?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', function (err, db) {
// 		if (err) throw err
// 		var collection = db.collection('articles');	

// 		parser.parseURL('http://www.nu.nl/rss', function(err, parsed) {
// 			if (err) throw err

// 			for (var i = 0, len = parsed.feed.entries.length; i < len; i++) {
// 			  	var tmp = parsed.feed.entries[i];
// 				collection.update({guid:tmp.guid}, {$set:tmp}, { upsert: true,w:1}, function(err, result) {
// 					if (err) throw err
// 				});
// 			}
// 		});
// 		res.redirect(302,'/'); //wait for insertion, then redirects
// 	})
//   	//res.send('crawler loaded, articles inserted!');
  	
// });

router.get('/', function(req, res, next) { // ../config/<user>
	parser.parseURL('http://www.nu.nl/rss',function(err, parsed) {
			if (err) throw err
			for (var i = 0, len = parsed.feed.entries.length; i < len; i++) {
		  		var tmp = parsed.feed.entries[i];
		  		//console.log(tmp);
				var promise = new Articles({tmp}).save();
			}
			//console.log('articles inserted!');
			res.redirect(302,'/'); //wait for insertion, then redirects
		});
});

module.exports = router;
