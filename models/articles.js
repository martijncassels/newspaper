var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var articleSchema = mongoose.Schema({
		    guid: String,
		    title: String,
		    link: String,
		    pubDate: String,
		    enclosure: {
		    	url: String
		    	//length: [String],
		    	//type: [String]
		    },
		    'dc:creator': String,
		    content: String,
		    contentSnippet: String,
		    categories: [String]
		});

module.exports = mongoose.model('articles', articleSchema);