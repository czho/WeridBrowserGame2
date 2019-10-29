var d = null;
var f = 4;
var g = 1 << f;
var h = 8;
var i = 1 << h;
var j = 4095;
var k = 4;
this.k = k
var l = .5;
var m = function (a) {
    return .5 * (1 - Math.cos(a * Math.PI))
};
module.exports = class noiseSystem {
    constructor() {
        var d = null;
        var f = 4;
        var g = 1 << f;
        var h = 8;
        var i = 1 << h;
        var j = 4095;
        var k = 4;
        this.k = k
        var l = .5;
        var m = function (a) {
            return .5 * (1 - Math.cos(a * Math.PI))
        };
    }
    noise(a, b, c) {
        var k = this.k
        if (b = b || 0, c = c || 0, null == d) {
            d = new Array(j + 1);
            for (var e = 0; j + 1 > e; e++) d[e] = Math.random()
        }
        0 > a && (a = -a), 0 > b && (b = -b), 0 > c && (c = -c);
        for (var n, o, p, q, r, s = Math.floor(a), t = Math.floor(b), u = Math.floor(c), v = a - s, w = b - t, x = c - u, y = 0, z = .5, A = 0; k > A; A++) {
            var B = s + (t << f) + (u << h);
            n = m(v), o = m(w), p = d[B & j], p += n * (d[B + 1 & j] - p), q = d[B + g & j], q += n * (d[B + g + 1 & j] - q), p += o * (q - p), B += i, q = d[B & j], q += n * (d[B + 1 & j] - q), r = d[B + g & j], r += n * (d[B + g + 1 & j] - r), q += o * (r - q), p += m(x) * (q - p), y += p * z, z *= l, s <<= 1, v *= 2, t <<= 1, w *= 2, u <<= 1, x *= 2, v >= 1 && (s++, v--), w >= 1 && (t++, w--), x >= 1 && (u++, x--)
        }
        return y
    }
    noiseDetail(a, b) {
        a > 0 && (k = a), b > 0 && (l = b)
    }
    noiseSeed(a) {
        var b = function () {
            var a, b, c = 4294967296,
                d = 1664525,
                e = 1013904223;
            return {
                setSeed: function (d) {
                    b = a = (null == d ? Math.random() * c : d) >>> 0
                },
                getSeed: function () {
                    return a
                },
                rand: function () {
                    return b = (d * b + e) % c, b / c
                }
            }
        }();
        b.setSeed(a), d = new Array(j + 1);
        for (var c = 0; j + 1 > c; c++) d[c] = b.rand()
    }
}