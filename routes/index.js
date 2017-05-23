var express = require('express');
var router = express.Router();
var parser = require('rss-parser');
var _ = require('underscore');

var Articles = require('../models/articles.js');

// function CountTopWord(sentence){
// 	var splitted = [];
// 	splitted = sentence.split(" ");
// 	splitted = _.without(splitted, "de", "het", "een");
// 	//splitted = _.without(splitted, "the", "a", "an");
// 	var top = _.chain(splitted).countBy().pairs().max(_.last).head().value();
// 	return top;
// }

router.get('/', function(req, res, next) {

	var promise = Articles.find().sort({pubDate:-1}).exec();

	promise.then(function(articles) {
		  res.render('index', { title: 'Newspaper!',articles:articles});
	})
	// .then(function(articles) {
	// 	  // do something with updated user
	// })
	.catch(function(err){
		  console.log('error:', err);
	});

});

router.get('/item/:id', function(req, res, next) {

	var promise = Articles.find({_id:req.params.id}).exec();

	promise.then(function(articles) {
	   	res.render('item', { title: 'Newspaper!',articles:articles});
	})
	.catch(function(err){
		  console.log('error:', err);
	});

});

// router.list = function(req, res) {
//   Articles.find(function(err, articles) {
//     res.send(articles);
//   });
// }

module.exports = router;
