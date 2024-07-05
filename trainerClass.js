var pokemons = require("./pokemons");
const {
  charizard,
  blastoise,
  gyarados,
  pikachu,
  snorlax,
  venusaur,
  lapras,
  pidgeot,
  arcanine,
  gengar,
  ninetales,
  sceptile,
  greninja,
  nidoking,
  electivire,
  alakazam,
  dragonite,
  aerodactyl,
  kingdra,
  garchomp,
  milotic,
  spiritomb,
} = require("./pokemons");

const Trainers = class Trainers {
  constructor(name, pkm, input) {
    this.name = name;
    this.pkm = pkm;
    this.input = input;
  }
  present() {
    var allPokemnosOfTrainer = this.pkm.map((element) => {
      return element.name;
    });
    console.log(
      `${this.input} - My name is ${this.name} and my pokemons are ${allPokemnosOfTrainer}`
    );
  }
};

const allTrainers = [
  // entrenadores para usarse
  new Trainers("Red", [charizard, snorlax, lapras], 1),
  new Trainers("Blue", [blastoise, arcanine, pidgeot], 2),
  new Trainers("Green", [venusaur, gengar, ninetales], 3),
  new Trainers("Ash", [pikachu, sceptile, greninja], 4),
  new Trainers("Gary", [electivire, nidoking, alakazam], 5),
  new Trainers("Lance", [dragonite, kingdra, aerodactyl], 6),
  new Trainers("Cynthia", [garchomp, spiritomb, milotic], 7),

  // entrenadores despues de 1 victoria, una wea pelua
];

module.exports = allTrainers;
