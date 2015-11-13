var express = require('express');
var http = require('http');
var path = require('path');
var app     = express();

//Variables used for caching responses
var cachingMap = {};

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendfile('./public/views/layouts/index.html');
});

app.get('/menus', function( req, res) {
	var url = "http://html5news.herokuapp.com/articles/categories";
	fetchData(url, res);
});

app.get('/banners', function( req, res) {
		var url = "http://html5news.herokuapp.com/banners";
		fetchData(url, res);
});

app.get('/featured', function(req, res) {
		var url = "http://html5news.herokuapp.com/articles/featured";
		fetchData(url, res);
});

app.get('/categories/:id', function(req, res) {
	var url = "http://html5news.herokuapp.com/category/" + req.params.id;
	fetchData(url, res);
});

//Method used to fetch new content or return cached response
function fetchData(url, res){

	var response = cachingMap[url];

		if (response  == undefined ) {
			response = "";
			console.log("new content");

			http.get(url, function(result) {
				result.on('data', function (chunk) {
						response += chunk;
						res.write(chunk);
						cachingMap[url] = response;
					});
				result.on('end', function () {
						res.end();
				});

			});
		} else {
				console.log("cached content");
				res.write(cachingMap[url]);
				res.end();
		}

}

app.listen(8000);
