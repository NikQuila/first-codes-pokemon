const funciones = require("./pokemonFunctions");

const Pokemon = class Pokemon {
  constructor(name, type, hp, atk, satk, df, sdf, speed, moves) {
    this.name = name;
    this.type = type;
    this.hp = hp;
    this.df = df;
    this.sdf = sdf;
    this.atk = atk;
    this.satk = satk;
    this.speed = speed;
    this.moves = moves;
  }
  //   presnetacion

  present() {
    console.log(`My name is ${this.name} and im a ${this.type} pokemon,`);
  }
  //   un turno cualquiera
  attackTo(pkn2) {
    // ver efectividad de los tipos
    var multiply = 1;
    for (var i in second.type) {
      if (first.move1.typeOfMove.SuperEffective.includes(second.type[i].type)) {
        multiply *= 2;
      }
      if (first.move1.typeOfMove.notEffective.includes(second.type[i].type)) {
        multiply /= 2;
      }
    }
    // tipo de ataque
    var typeOfAtacck = first.move1.classOfMove;
    var typeOfDefense = first.move1.classOfMove;
    if (typeOfAtacck == "s.atk") {
      typeOfAtacck = first.satk;
      typeOfDefense = second.sdf;
    } else if (typeOfAtacck == "atk") {
      typeOfAtacck = first.atk;
      typeOfDefense = second.df;
    }

    var damageTotal =
      0.01 *
        multiply *
        100 *
        ((0.2 * 50 * typeOfAtacck * first.move1.damage) / 25 / typeOfDefense) +
      2;
    console.log(damageTotal);
    // primer ataque
    second.hp -= damageTotal;
    console.log(`${second.name} have recieved damage, hp lest : ${second.hp}`);
    var multiply = 1;
    for (var i in first.type) {
      if (second.move1.typeOfMove.SuperEffective.includes(first.type[i].type)) {
        multiply *= 2;
      }
      if (second.move1.typeOfMove.notEffective.includes(first.type[i].type)) {
        multiply /= 2;
      }
    }

    // segundo ataque
    var typeOfAtacck = second.move1.classOfMove;
    var typeOfDefense = second.move1.classOfMove;
    if (typeOfAtacck == "s.atk") {
      typeOfAtacck = second.satk;
      typeOfDefense = first.sdf;
    } else if (typeOfAtacck == "atk") {
      typeOfAtacck = second.atk;
      typeOfDefense = first.df;
    }

    var damageTotal =
      0.01 *
        multiply *
        100 *
        ((0.2 * 50 * typeOfAtacck * second.move1.damage) / 25 / typeOfDefense) +
      2;
    console.log(damageTotal);
    // primer ataque
    first.hp -= damageTotal;
    console.log(`${first.name} have recieved damage, hp lest : ${first.hp}`);
  }
};

module.exports = Pokemon;
