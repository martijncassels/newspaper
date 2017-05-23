var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var configSchema = mongoose.Schema({
		user: String,
		feed: [{title: String, url: String}]
		});

module.exports = mongoose.model('configs', configSchema);