let ons = 0;
let offs = 0;
let totals = 0;
let avgons = 0;
let avgoffs = 0;
let seeds = [];
const noiseSystem = require('./noiseSystem');
const noiseSystemInstance = new noiseSystem();
for (let seed = 0; seed < 1000; seed++) {
    noiseSystemInstance.noiseSeed(seed);
    for (let y = 0; y < 500; y++) {
        for (let x = 0; x < 500; x++) {
            if (noiseSystemInstance.noise((x / 100), (y / 100)) > 0.5) {
                ons += 1;
                totals += 1
            } else {
                offs += 1;
                totals += 1;
            }
        }
    }

    avgons = ons / totals;
    avgoffs = offs / totals;

    if (Math.round(avgoffs * 100) == 50, Math.round(avgons * 100) == 50) {
        console.log(ons, offs, totals, avgons, avgoffs, seed, Math.abs(avgoffs - avgons));
        seeds.push(new seedd(ons, offs, totals, avgons, avgoffs, seed, Math.abs(avgoffs - avgons)));
    }
    //console.log()
    /* else{
        console.log(ons,offs,totals,avgons,avgoffs);
        console.log(Math.round(avgoffs*10),Math.round(avgons*10)>5);
    } */
    ons = 0;
    offs = 0;
    totals = 0;
    avgons = 0;
    avgoffs = 0;
}
console.log(seeds);
let smallest = new seedd(0, 1, 1, 1, 1, 1, 1);
for (let i = 0; i < seeds.length; i++) {
    if (seeds[i].difs < smallest.difs) {
        smallest = seeds[i]
    }
}

console.log(smallest.difs,smallest.seed)

function seedd(ons, offs, totals, avgons, avgoffs, seed, difs) {
    this.ons = ons;
    this.offs = offs;
    this.totals = totals;
    this.avgons = avgons;
    this.avgoffs = avgoffs;
    this.seed = seed
    this.difs = difs
}