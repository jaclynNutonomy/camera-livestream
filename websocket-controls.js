#!/usr/bin/node
//Chat server and Python control server
module.paths.push('/usr/local/lib/node_modules');
var fs = require('fs'),
	http = require('http'),
	express= require('express'),
	WebSocket = require('ws'),
	url=require('url');

var WEBSOCKET_PORT = 8085;

//robo control socket
var roboServ = require('http');
roboApp = roboServ.createServer().listen(8086);
var roboSocketServer = require('ws').Server;
var roboWS = new roboSocketServer({server: roboApp});
roboWS.broadcast = function(data, opts) {
	roboWS.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
};
roboWS.connectionCount = 0;
roboWS.on('connection', function(socket, upgradeReq) {
	roboWS.connectionCount++;
	console.log(
		'New WebSocket Connection: ', 
		(upgradeReq || socket.upgradeReq).socket.remoteAddress,
		(upgradeReq || socket.upgradeReq).headers['user-agent'],
		'('+roboWS.connectionCount+' total)'
	);
	socket.on('message', function (message) {
		console.log(msg);
	});
});
//websocket server
var httpServ = require('http');
app = httpServ.createServer().listen(WEBSOCKET_PORT,  () => console.log('Listening on port ' + WEBSOCKET_PORT+ '!'));
var WebSocketServer = require('ws').Server;
var ws = new WebSocketServer({server: app});
ws.broadcast = function(data, opts) {
	ws.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(data);
		}
	});
};

ws.connectionCount = 0;
ws.on('connection', function(socket, upgradeReq) {
	ws.connectionCount++;
	console.log(
		'New WebSocket Connection: ', 
		(upgradeReq || socket.upgradeReq).socket.remoteAddress,
		(upgradeReq || socket.upgradeReq).headers['user-agent'],
		'('+ws.connectionCount+' total)'
	);
	socket.on('message', function (message) {
		var msg = JSON.parse(message);
		if (msg.type === 'chat') {
			console.log('broadcasting');
			ws.broadcast(message);
		} else if (msg.type === 'controlSig') {
			console.log('Sending command to robo controller.');
			roboWS.broadcast(message);
		}
		console.log(msg);
	});
});
var exec = require('child_process').exec, child;

child = exec('python stepper_con.py 172.30.90.83/14',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
	});
	