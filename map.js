const Array2d = require('./2dArray');
const noiseSystemInstance = require('./noiseSystem');
const noiseSystem = new noiseSystemInstance();
module.exports = class Map {
    constructor(width, height, seed, noise) {
        this.seed = seed
        this.width = width;
        this.height = height;
        this.map = new Array2d(width);
        if (noise) {
            noiseSystem.noiseSeed(seed);
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    if (noiseSystem.noise((x / 100), (y / 100)) > 0.4) {
                        this.map[x][y] = 1;
                    } else {
                        this.map[x][y] = 0;
                    }
                }
            }
        }
        else{
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                        this.map[x][y] = 0;
                }
            }
        }
    }
}