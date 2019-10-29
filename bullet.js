module.exports = class bullet {
    constructor(pos, name, uuid, color, move, maxTime) {
        this.name = name
        this.uuid = uuid
        this.x = pos[0];
        this.y = pos[1];
        this.color = color
        this.mx = move[0]
        this.my = move[1]
        this.time = 0;
        if(maxTime==undefined){
            this.maxTime = 255;
        }else
        this.maxTime = maxTime;
    }
    update(map){
        if(map.map[this.x+this.mx][this.y+this.my]==1){
            this.x+=this.mx
            this.y+=this.my
        }
        //console.log(this.mx,this.my)
    }

}