var express = require('express');
var router = express.Router();
var _ = require('underscore');

var Configs = require('../models/config.js');
var app = express();
app.locals.msg = '';

router.get('/', function(req, res, next) { // ../config
	var promise = Configs.find().exec();
	promise.then(function(result){
		if (app.locals.msg == '') {
			app.locals.msg = 'No user input, new user?';
		}
		res.render('config',{ msg:app.locals.msg, userlist:result });
		app.locals.msg = '';
	})
	.catch(function(err){
		console.log('error:', err);
	})
		
});

router.get('/:user', function(req, res, next) { // ../config/<user>
	var promise = Configs.find({user:req.params.user}).exec();
	promise.then(function(result) {
		if (app.locals.msg == '') {
			app.locals.msg = 'User found!';
		}
		//console.log(result[0].feed[0]);
		res.render('config', { config:result[0], msg: app.locals.msg });
		app.locals.msg = '';
	})
	.catch(function(err){
		  console.log('error:', err);
	});
});

router.post('/new', function(req, res, next) { // ../config/new

	var promise = new Configs({user: req.body.user, feed: {title: req.body.feedtitle, url: req.body.feedurl }}).save();
	promise.then(function(){
			app.locals.msg = 'User added!';
			res.redirect('/config/'+req.body.user);
	})
	.catch(function(err){
		  console.log('error:', err);
	});
});

router.post('/update/:id', function(req, res, next) { // ../config/update/<_id>

	var promise = Configs.findById(req.params.id).exec();
	promise.then(function (config) {
			var feeds = []; 
	        config.user = req.body.user || config.user;
	        for (var i = 0, len = req.body.feedtitle.length; i < len; i++) {
	        	feeds.push({'title':req.body.feedtitle[i],'url':req.body.feedurl[i]});
	        	//console.log('feeds: ',feeds);
	        }
	        config.feed = feeds || config.feed;
	        //config.feed[0].url = req.body.feedurl || config.feed[0].url;
	        return config;
	})
	.then(function(config) {
	    return config.save();
	})
	.then(function(config) {
		app.locals.msg = 'User updated!';
	    res.redirect('/config/'+req.body.user);
	})
	.catch(function(err){
		  console.log('error:', err);
	});
});

router.get('/delete/:id', function(req, res, next) { // ../config/delete/<_id>

	var promise = Configs.findByIdAndRemove(req.params.id).exec();
	promise.then(function (config) {  
    	app.locals.msg = 'User deleted!';
    	res.redirect('/config');
	})
	.catch(function(err){
		  console.log('error:', err);
	});
});

module.exports = router;
