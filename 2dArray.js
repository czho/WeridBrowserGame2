class Array2d {
  constructor(num) {
    this.size = num;
    let array = [];
    for (let y = 0; y < num; y++) {
      array[y] = new Array;
    }
    for (let y = 0; y < num; y++) {
      for (let x = 0; x < num; x++) {
        array[x][y] = new Array;
      }

    }
    this.array = array;
    return array
  }
}
module.exports = Array2d;