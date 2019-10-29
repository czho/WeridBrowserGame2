module.exports.spawn = function spawn(map) {
    if (map != null) {
        for (var y = 0; y < map.length; y++) {
            for (var x = 0; x < map[0].length; x++) {
                i = Math.floor(Math.random() * map.length);
                j = Math.floor(Math.random() * map[0].length)
                if (map[i][j]==0) {
                    return [i, j]
                }
            }
        }

    }
    return [10,10]
}