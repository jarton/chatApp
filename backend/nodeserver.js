var http = require('http'),
	url = require('url'),
	fs =require('fs'),
	path = require('path'),
	express = require('express');

var app = express();

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*"),
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


var messages = ["test"];
var clients = [];

app.get('/', function(req, res){
			res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/poll/*', function(req, res){
		var count = req.url.replace(/[^0-9]*/, '');
		if (messages.length > count) {
			console.log("sendt poll repsonse");
			res.send(JSON.stringify( {
				count: messages.length,
				append: messages.slice(count).join("\n")+"\n"
			}));
		}
		else {
			clients.push(res);
		}

});

app.get('/msg/*', function(req, res){
		var msg = unescape(req.url.substr(5));
		messages.push(msg);
		while(clients.length > 0) {
			var client = clients.pop();	
			client.send(JSON.stringify({
				count: messages.length,
				append: msg+"\n"
			}));
		}
		res.send();
});

var server = app.listen(8080);
//var host = server.adress().adress;
//var port = server.adress().port;
//console.log('Server running.');
//});

