const superheros = require("superheroes");
const supervillains = require("supervillains");

var mySuperheroName = superheros.random();
var mySupervillainName = supervillains.random();

console.log(mySuperheroName + " vs. " + mySupervillainName);