let sc = 20;
var x = 0;
var y = 0;
var gamestarted = true;
var paused = false;

function setup() {

    createCanvas(floor(windowWidth / sc) * sc, floor(windowHeight / sc) * sc);
    rectMode(CENTER);
    //colorMode(HSB)
    frameRate(10)
    noStroke();
    fill(0);
    socket.emit('player', 'W')
}

function draw() {
    // if (gamestarted != true) {
    //    background(255)
    //     background(127, 127, 127, 127)
    //}
    //if (gamestarted) {
    background(255)
    if (paused != true) {
        if (maps != null) {
            if (player != null) {
                //fill(0)
                //push();

                //pop();
                //text(player.x,0,0)
                //console.log(player.x,player.y)

                var mx = 0;
                var my = 0;
                var shoot = undefined;
                if (keyIsDown(65) && player.x - 1 > -1 && player.y < maps.map.length && player.x - 1 < maps.map.length && maps.map[player.x - 1][player.y] == 0) {
                    mx -= 1
                }
                if (keyIsDown(68) && player.x + 1 > -1 && player.y < maps.map.length && player.x + 1 < maps.map.length && maps.map[player.x + 1][player.y] == 0) {
                    mx += 1
                }
                if (keyIsDown(83) && player.x > -1 && player.y + 1 < maps.map.length && player.x < maps.map.length && maps.map[player.x][player.y + 1] == 0) {
                    my += 1
                }
                if (keyIsDown(87) && player.x > -1 && player.y - 1 < maps.map.length && player.x < maps.map.length && maps.map[player.x][player.y - 1] == 0) {
                    my -= 1
                }
                if (keyIsDown(32) && (abs(mx) + abs(my) !== 0)) {
                    socket.emit('shoot', [mx, my])
                    //console.log([mx,my])
                }
                if (maps.map[player.x + mx][player.y + my] == 0) {
                    if (abs(mx) + abs(my) > 0) {
                        player.x += mx;
                        player.y += my;
                        socket.emit('move', [mx, my])
                    }
                }
                colorMode(RGB)
                document.title = "x:" + player.x + " y:" + player.y
                fill(player.color[0], player.color[1], player.color[2])
                translate((-player.x * sc) + width / 2, (-player.y * sc) + height / 2);
                stroke(0)
                rect(player.x * sc, player.y * sc, sc, sc);
                fill(0)
                noStroke()
                textAlign(CENTER)
                text(player.name, (player.x * sc), (player.y * sc) - (sc / 2));
                rect((player.x * sc), (player.y * sc) - (sc / 2), sc * player.score / player.level)
                stroke(0)

            }
            if (players.length > 0) {
                for (let i = 0; i < players.length; i++) {
                    if (players[i] == null || players[i].uuid == player.uuid) {
                        console.log(i, players[i])
                        players.splice(i);

                    }
                }
                for (let i = 0; i < players.length; i++) {
                    if (players[i] !== undefined) {
                        if (players[i].name == undefined) {
                            players[i].name = 'tank'
                        }
                        if (players[i] != null && players[i].x != null && players[i].name != null) {
                            fill(players[i].color[0], players[i].color[1], players[i].color[2])
                            rect(players[i].x * sc, players[i].y * sc, sc, sc);
                            //console.log(players[i].name )
                            fill(0)
                            noStroke();
                            text(players[i].name, (players[i].x * sc), (players[i].y * sc) - (sc / 2));
                            stroke(0)
                        }
                    }
                }
            }
            for (let i = 0; i < bullets.length; i++) {
                colorMode(HSB)
                fill(bullets[i].time, bullets[i].maxTime, 255)
                rect(bullets[i].x * sc, bullets[i].y * sc, sc, sc);
            }



            noStroke();
            //colorMode(RGB)
            fill(0);


            let ff = 0;
            for (let i = 0; i < width / sc; i++) {
                for (let j = 0; j < height / sc; j++) {
                    push();

                    if (((player.x) - int((width / 2) / sc) + i > -1) && ((player.y) - int((height / 2) / sc) + j > -1)) { //&&((player.y) + int((height / 2) / sc) + j<((player.y) + int(height / 2) / sc) + j)){//&&((player.x) + int((width / 2) / sc) + i<((player.x) + int(width / 2) / sc) + i)) {
                        //console.log(i, j)
                        if (player.x - int((width / 2) / sc) + i < maps.map.length && player.y - int((height / 2) / sc) + j < maps.map.length) {
                            if (maps.map[(player.x) - int((width / 2) / sc) + i][(player.y) - int((height / 2) / sc) + j]) {
                                fill(0);
                                rect(((player.x) - int((width / 2) / sc) + i) * sc, ((player.y) - int((height / 2) / sc) + j) * sc, sc, sc)
                                //console.log(i, j);
                                ff += 1;
                            }
                        } else {
                            fill(0);
                            rect(((player.x) - int((width / 2) / sc) + i) * sc, ((player.y) - int((height / 2) / sc) + j) * sc, sc, sc)
                        }
                    } else {
                        fill(0);
                        rect(((player.x) - int((width / 2) / sc) + i) * sc, ((player.y) - int((height / 2) / sc) + j) * sc, sc, sc)
                    }
                    pop();
                }
            }

        }
    }
}

function windowResized(width, height) {
    resizeCanvas(int(windowWidth / sc) * sc, int(windowHeight / sc) * sc)
}

function iscolided(x, y) {
    if (x < -1 || y < -1 || x > int((width / 2) / sc) || y > int((height / 2) / sc) || maps.map[x][y] == 1) {
        return true
    }
}