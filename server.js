// import and initialize the dispatcher module
var HttpDispatcher = require('httpdispatcher');
var dispatcher = new HttpDispatcher();

dispatcher.setStaticDirname('static');
dispatcher.setStatic('/resources');

// import the HTTP module
var http = require('http');
// set max connections to 5, default infinity
http.globalAgent.maxSockets = 5;

// import extra modules required
var url = require('url');
var fs = require('fs');

// define a port to use
const PORT = 6969;

// filters and parses the pathname 
dispatcher.beforeFilter(/\//, function(req, res, chain) { 
    var request = url.parse(req.url, true);
    var path = request.pathname;

    // terminate connection after call
    res.shouldKeepAlive = false;

    // outputs the path retrieving onto the server console
    console.log(path);

    // check filetype of request
    var filetype = null;
    if(path.indexOf('.jpg') != -1) 
	filetype = 'image/jpg';
    else if(path.indexOf('.html') != -1)
	filetype = 'text/HTML';

    // tries to find requested file on server
    try {
	var stats = fs.statSync('.' + path);
	var filesize = stats["size"];
	var readfile = fs.readFileSync('.' + path);
	res.writeHead(200, {
	    'Content-Type': filetype,
	    'Content-Length': filesize
	});
	res.end(readfile, 'binary');
    }
    catch(err) {
	console.log(err);
    }
    chain.next(req, res, chain);
});

dispatcher.afterFilter(/\//, function(req, res, chain) {
    chain.next(req, res, chain);
});

// dispatcher error handling
dispatcher.onError(function(req, res) {
    res.writeHead(404);
    res.end('404 - Page Not Found');
});

// connection handler
function connectionHandler(connect) {
    var remoteAddress = connect.remoteAddress + ':' + connect.remotePort;
    // prints message when establishing connection
    console.log('Connection opened from ' + remoteAddress);
    
    connect
	.on('data', function(data) {
	    // for POST requests if needed
	    console.log('Data from ' + remoteAddress + ': ' + data);
	    connect.write(data);
	})
	.on('error', function(err) {
	    // error when establishing connectiion
	    console.log('Connection ' + remoteAddress + ' error: ' + err.message);
	})
	.on('close', function() {
	    // prints message when shutting down connection
	    console.log('Connection closed from ' + remoteAddress + '\n');
	});
}

// create and initialize server
http
    .createServer(function(req, res) {
	dispatcher.dispatch(req, res);
    })
    .on('connection', connectionHandler)
    .listen(PORT, function() {
	console.log('Server initialized on localhost at PORT: ' + PORT);
    });
