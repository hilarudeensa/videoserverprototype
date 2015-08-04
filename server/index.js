var http = require("http");
var vidStreamer = require("vid-streamer");
var fs = require('fs');


vidStreamer.settings({
	"mode": "development",
	"forceDownload": false,
	"random": false,
	"rootFolder": __dirname + "/../videos/",
	"rootPath": "videos/",
	"server": "VidStreamer.js/0.1.4",
	"maxAge": "3600",
	"throttle": false
});

var app = http.createServer(function(req, res) {
	if (req.url.indexOf('videos') !== -1) {
		vidStreamer(req, res);
	} else if (req.url.indexOf('favicon.ico') === -1 && req.url.indexOf('favicon.ico')) {
		//fs.readFileSync('./client/indexhtml');
		fs.readFile(__dirname + '/../client/index.html',
			function(err, data) {
				if (err) {
					console.log(err);
					res.writeHead(500);
					return res.end('Error loading index.html');
				}

				res.writeHead(200);
				res.end(data);
			});
	} else {
		res.writeHead(200);
		res.end();
	}
});
app.listen(3000);
console.log("VidStreamer.js up and running on port 3000");