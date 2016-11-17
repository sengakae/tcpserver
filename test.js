/* 
 * This script will make 6 simultaneous get requests to the server 
 * initialized from server.js.
 * 
 * 1) start the server - 'node server.js'
 * 2) on a new terminal, run this test script - 'node test.js'
 *
 * Things to note:
 * Status Codes - options3, with notfound.jpg will not result in a successful request
 * Max Connections - on the server console, only 5 connections are opened at once, after which the sixth request must wait in queue
 *
 * To test in browser:
 * 'localhost:6969/resources' + path
 * path = file to get (index.html, sample.jpg)
 */

// import http module
var http = require('http');

// for options header
var path = '/resources';
var host = 'localhost';
var port = 6969;

// the 3 options we will be using
var options1 = {
    host: host,
    port: port,
    path: path + '/index.html'
};

var options2 = {
    host: host,
    port: port,
    path: path + '/sample.jpg'
};

var options3 = {
    host: host,
    port: port,
    path: path + '/notfound.jpg'
};

// makes 6 asynchoronous get requests to server and prints their status code
http.get(options1, function(res) {
    console.log(options1.path + ' - ' + res.statusCode);

    res.on('error', function(err) {
	console.log('Error - ' + err.message);
    });
});

http.get(options2, function(res) {
    console.log(options2.path + ' - ' + res.statusCode);

    res.on('error', function(err) {
	console.log('Error - ' + err.message);
    });
});

http.get(options3, function(res) {
    console.log(options3.path + ' - ' + res.statusCode);

    res.on('error', function(err) {
	console.log('Error - ' + err.message);
    });
});

http.get(options1, function(res) {
    console.log(options1.path + ' - ' + res.statusCode);

    res.on('error', function(err) {
	console.log('Error - ' + err.message);
    });
});

http.get(options2, function(res) {
    console.log(options2.path + ' - ' + res.statusCode);

    res.on('error', function(err) {
	console.log('Error - ' + err.message);
    });
});

http.get(options3, function(res) {
    console.log(options3.path + ' - ' + res.statusCode);

    res.on('error', function(err) {
	console.log('Error - ' + err.message);
    });
});
