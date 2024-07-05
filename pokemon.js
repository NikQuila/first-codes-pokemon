// pido lo necesario
const trainers = require("./trainerClass");
const prompt = require("prompt-sync")();
const pokemons = require("./pokemons");
const battle = require("./pokemonFunctions");
const randomItem = require("random-item");
// const funciones = require("./pokemonFunctions");
function juegoCompleto() {
  var ganasteONo = true;
  // presentacion de entrenadores y guardarlos
  trainers.forEach((trainer) => {
    trainer.present();
  });

  // Elegir entrenador
  var yourTrainer = prompt(
    "Which trainer do you want to be. Please write the number of the trainer"
  );
  yourTrainer = trainers[yourTrainer - 1];
  console.log("------------------------");
  console.log(`Welcome back ${yourTrainer.name}`);
  console.log("------------------------");

  // Elección Rival
  var posiblesRivales = trainers.filter((element) => {
    return element != yourTrainer;
  });

  posiblesRivales.forEach((x) => {
    if (ganasteONo) {
      var rival = randomItem(posiblesRivales);
      console.log(`Its time for Battle, your rival is ${rival.name}`);
      console.log("------------------------");
      posiblesRivales = posiblesRivales.filter((element) => {
        return element != rival;
      });
      // Battle
      ganasteONo = battle(yourTrainer, rival);
    }
  });
}

juegoCompleto();
