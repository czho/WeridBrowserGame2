//Http server stuff
const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const port = process.env.PORT || 3000;

//Socket.IO Server as child
const io = require('socket.io')(http);

//Scripts loaded Player, Map defined and utils loaded 
const Player = require('./player');
const utils = require('./utils');
const mapInstance = require('./map');
const bullet = require('./bullet');

//New Map called
const seed = 61;
const map = new mapInstance(250, 250, seed, true);

//Socket array
var sockets = [];

var bullets = [];
var bulletsUpdate = setInterval(() => {
	if (bullets.length > 0) {
		for (let i = 0; i < bullets.length; i++) {
			bullets[i].time += 10;
			if (colide(bullets[i].x += bullets[i].mx, bullets[i].y += bullets[i].my)) {
				//console.log(colistion(bullets[i].x += bullets[i].mx, bullets[i].y += bullets[i].my))
				bullets[i].x += bullets[i].mx
				bullets[i].y += bullets[i].my
			}
			if (bullets[i].time > bullets[i].maxTime) {
				//bullets = bullets.splice(i)
				bullets.splice(0, i)
				//console.log(i)
			}


		}
		io.emit('bullet', bullets);
	}
}, 50);

//On Connection Event
io.on('connection', function(socket) {
	socket.uuid = Math.random() * 1000
	//console.log(io.clients());
	//Emits all the curent players online
	//console.log()

	//console.log(players)
	//Adds player to socket array


	//Emits map
	socket.emit('map', map);

	//Defines the on create player event
	socket.on('player', (data) => {
		sockets.push(socket);
		//Defines socket.player as new Player;
		socket.player = new Player(utils.spawn(map.map), data, socket.uuid, [Math.random() * 255, Math.random() * 255, Math.random() * 255]);

		//Gives client the player date, x, y, uuid, map, name and color of its player instace.
		socket.emit('player', socket.player);
		socket.on('move', (data) => {
			if (socket.player != undefined && data instanceof Array && data.length == 2 &&
				socket.player.x + data[0] < map.map.length && socket.player.y + data[1] < map.map.length && socket.player.x + data[0] > -1 && socket.player.y + data[1] > -1 && map.map[socket.player.x + data[0]][socket.player.y + data[1]] != undefined && map.map[socket.player.x + data[0]][socket.player.y + data[1]] != 1 &&
				(Math.abs(data[0]) == 1 || Math.abs(data[1]) == 1)) {
				if (Math.abs(data[0]) == 1) {
					socket.player.x += Math.floor(data[0]);
				}
				if (Math.abs(data[1]) == 1) {
					socket.player.y += Math.floor(data[1]);
				}
				//console.log(data)
				socket.emit('move', [socket.player.x, socket.player.y]);

				io.emit('playermove', socket.player)

			}
		});
		socket.on('disconnect', () => {
			let ff = socket.player
			//console.log(sockets)
			for (let i = 0; i < sockets.length; i++) {
				if (sockets[i].id = socket.id) {
					sockets.splice(i)
				}
			}
			socket.player = undefined;
			ff = undefined;
		});
		socket.on('shoot', (data) => {
			if (socket.player !== undefined && data.length == 2 && (Math.abs(data[0]) || Math.abs(data[1]))) {
				bullets.push(new bullet([socket.player.x + data[0], socket.player.y + data[1]], socket.player.name, socket.uuid, socket.player.color, data, 255));
			}
		});
	});
});

app.use(express.static(process.cwd() + '/public'));


http.listen(port, function() {
	console.log('listening on *:' + port);
});
process.on("uncaughtException", thing => {
	console.log("Uptime: " + process.uptime(), "Date-time: " + new Date())
	console.log(thing)
});

function colide(x, y) {
	if (outofbounds(x, y) || mapcolide(x, y) || bulletcolide(x, y))
		return false
	return true
}
function mapcolide() {
	if (map.map[x, y])
		return true
	return false
}
function bulletcolide(x, y) {
	for (let i = 0; i < bullets.length; i++) {
		if (bullets[i].x == x && bullets[i].y == y) {
			return true
		}
		return false
	}
}
function outofbounds(x, y) {
	if (-1 > y || -1 > x || y > map.height || map.width > x)
		return true
	return false
}