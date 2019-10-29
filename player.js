module.exports = class Player {
    constructor(pos, name, uuid, color, score) {
        this.name = name;
        this.uuid = uuid
        this.x = pos[0];
        this.y = pos[1];
        this.color = color
    }

}