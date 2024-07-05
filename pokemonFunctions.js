const trainers = require("./trainerClass");
var pokemons = require("./pokemons");
const randomItem = require("random-item");
const { poison } = require("./typeClass");
const status = require("./status");
const prompt = require("prompt-sync")();

const battle = function (user, rival) {
  user.pkm.forEach((poke) => {
    poke.status = "";
    poke.turnsWithStatus = undefined;
    poke.evasion = 100;
    poke.accuracy = 100;
    poke.turnsWiththeSameMove = 0;
  });
  var initialPokemonsUser = Object.assign([], user.pkm);
  initialPokemonsUser = JSON.parse(JSON.stringify(initialPokemonsUser));

  rival.pkm.forEach((poke) => {
    poke.status = "";
    poke.turnsWithStatus = undefined;
    poke.evasion = 100;
    poke.accuracy = 100;
    poke.turnsWiththeSameMove = 0;
  });
  var initialPokemonsRival = Object.assign([], rival.pkm);
  initialPokemonsRival = JSON.parse(JSON.stringify(initialPokemonsRival));
  var pokemonsLeftUser = user.pkm.map((element) => {
    return element.name;
  });
  var pokemonsLeftRival = rival.pkm.map((element) => {
    return element.name;
  });
  console.log(user.name);
  console.log("VS");

  // posibles pokemonUser
  // hasta q uno de los entrenadores se quede sin pokemon
  while ((pokemonsLeftUser.length > 0) & (pokemonsLeftRival.length > 0)) {
    console.log(`${rival.name} puede utilizar a : ${pokemonsLeftRival}`);
    console.log("Please select the number of your pokemon");
    for (var i in pokemonsLeftUser) {
      console.log(`${i} - ${pokemonsLeftUser[i]}`);
    }
    var indexPokemon = prompt();
    console.log("-------------------");
    let index = 0;
    user.pkm = user.pkm.map((element) => {
      if (pokemonsLeftUser.includes(element.name)) {
        return element;
      } else {
        delete user.pkm[index];
      }
      index += 1;
    });
    user.pkm = user.pkm.filter((element) => {
      return element;
    });
    rival.pkm = rival.pkm.map((element) => {
      if (pokemonsLeftRival.includes(element.name)) {
        return element;
      } else {
        delete rival.pkm[index];
      }
      index += 1;
    });
    rival.pkm = rival.pkm.filter((element) => {
      return element;
    });
    var activePokemonUser = user.pkm[indexPokemon];
    var activePokemonRival = randomItem(rival.pkm);
    console.log(
      `You: ${activePokemonUser.name}(${Math.round(activePokemonUser.hp)}) vs ${
        activePokemonRival.name
      }(${Math.round(activePokemonRival.hp)}) de ${rival.name}`
    );
    user.pokemonSelect = activePokemonUser;
    rival.pokemonSelect = activePokemonRival;
    console.log("Ambos jugadores están pensando su estrategia");
    while ((user.pokemonSelect.hp > 0) & (rival.pokemonSelect.hp > 0)) {
      // hasta que un pokemon se debilite
      //   defino algunas varibales
      var pokemonUser = user.pokemonSelect;
      var pokemonRival = rival.pokemonSelect;
      //    select the move
      console.log("Select the move number that you want to use");
      for (var i in user.pokemonSelect.moves) {
        if (user.pokemonSelect.moves[i].ability) {
          console.log(
            `${i} - ${user.pokemonSelect.moves[i].name} / ${user.pokemonSelect.moves[i].typeOfMove.type} / Ability : ${user.pokemonSelect.moves[i].description}`
          );
        } else {
          console.log(
            `${i} - ${user.pokemonSelect.moves[i].name} / ${user.pokemonSelect.moves[i].typeOfMove.type} / Power : ${user.pokemonSelect.moves[i].damage} / Accuracy : ${user.pokemonSelect.moves[i].accuracy}`
          );
        }
      }
      // cambiar pokemon
      console.log(`${user.pokemonSelect.moves.length} - Change Pokemon`);
      // var indexofmove = elegirBienUser();
      var indexofmove = prompt();
      var moveRival = rivalChooseWisely(pokemonUser.type, pokemonRival.moves);
      console.log("--------------------");
      var moveUser = pokemonUser.moves[indexofmove];

      if (indexofmove == user.pokemonSelect.moves.length) {
        pokemonUser = changePokemon(
          user.pokemonSelect,
          pokemonsLeftUser,
          user.pkm
        );
        user.pokemonSelect = pokemonUser;
        if (statusInitial(pokemonRival) == 0) {
          console.log(`${pokemonRival.name} no ataca`);
        } else {
          var effectividadRival = effectividad(
            moveRival.typeOfMove,
            pokemonUser.type
          );
          var stabRival = stab(pokemonRival.type, moveRival.typeOfMove);
          var accuracyRival = accuracy(
            moveRival.accuracy,
            pokemonRival,
            pokemonUser
          );

          var damageFromRival = daño(
            pokemonRival,
            pokemonUser,
            moveRival,
            effectividadRival,
            stabRival,
            accuracyRival
          );
          var x = pokemonUseHisMove(
            pokemonRival,
            moveRival,
            damageFromRival,
            effectividadRival,
            pokemonUser,
            initialPokemonsRival,
            accuracyRival,
            damageFromUser
          );
          if (x == 0) {
            damageFromUser = 0;
          }
        }
        console.log(
          `A ${pokemonRival.name} le queda ${Math.round(pokemonRival.hp)}`
        );
        console.log(
          `A ${user.pokemonSelect.name} le queda ${Math.round(
            user.pokemonSelect.hp
          )}`
        );
        console.log("-----------------------------");
      } else {
        //efectividad de ambos ataques
        var effectividadUser = effectividad(
          moveUser.typeOfMove,
          pokemonRival.type
        );
        var effectividadRival = effectividad(
          moveRival.typeOfMove,
          pokemonUser.type
        );
        //stab
        var stabUser = stab(pokemonUser.type, moveUser.typeOfMove);
        var stabRival = stab(pokemonRival.type, moveRival.typeOfMove);
        // accuracy
        var accuracyUser = accuracy(
          moveUser.accuracy,
          pokemonUser,
          pokemonRival
        );
        var accuracyRival = accuracy(
          moveRival.accuracy,
          pokemonRival,
          pokemonUser
        );
        // daño
        var damageFromUser = daño(
          pokemonUser,
          pokemonRival,
          moveUser,
          effectividadUser,
          stabUser,
          accuracyUser
        );
        var damageFromRival = daño(
          pokemonRival,
          pokemonUser,
          moveRival,
          effectividadRival,
          stabRival,
          accuracyRival
        );
        // quien parte
        var statusProblemUser = statusInitial(pokemonUser, damageFromRival);
        var statusProblemRival = statusInitial(pokemonRival, damageFromUser);
        var speeds = bestSpeed(pokemonUser, pokemonRival, moveUser, moveRival);
        var firstToAttack = speeds.first;
        var secondToAttack = speeds.second;
        if (firstToAttack == pokemonUser) {
          var move1 = moveUser;
          var move2 = moveRival;
          var damage1 = damageFromUser;
          var damage2 = damageFromRival;
          var effectividad1 = effectividadUser;
          var effectividad2 = effectividadRival;
          var statusProblem1 = statusProblemUser;
          var statusProblem2 = statusProblemRival;
          var allPokemons1 = initialPokemonsUser;
          var allPokemons2 = initialPokemonsRival;
          var accuracy1 = accuracyUser;
          var accuracy2 = accuracyRival;
        } else {
          var move1 = moveRival;
          var move2 = moveUser;
          var damage1 = damageFromRival;
          var damage2 = damageFromUser;
          var effectividad1 = effectividadRival;
          var effectividad2 = effectividadUser;
          var statusProblem1 = statusProblemRival;
          var statusProblem2 = statusProblemUser;
          var allPokemons1 = initialPokemonsRival;
          var allPokemons2 = initialPokemonsUser;
          var accuracy1 = accuracyRival;
          var accuracy2 = accuracyUser;
        }

        // respectivos ataques
        // lento recibe el ataque
        if (statusProblem1 == 0) {
          console.log(
            `${firstToAttack.name} no ataca debido a que esta ${firstToAttack.status}`
          );
        } else {
          x = pokemonUseHisMove(
            firstToAttack,
            move1,
            damage1,
            effectividad1,
            secondToAttack,
            allPokemons1,
            accuracy1,
            damage2
          );
          if (x == 0) {
            damage2 = 0;
          }
        }
        // si el lento sigue vivo ataca
        statusProblem2 = statusInitial(secondToAttack, damage1);
        if (secondToAttack.hp > 1) {
          if (statusProblem2 == 0) {
            console.log(
              `${secondToAttack.name} no ataca debido a que esta ${secondToAttack.status}`
            );
          } else {
            x = pokemonUseHisMove(
              secondToAttack,
              move2,
              damage2,
              effectividad2,
              firstToAttack,
              allPokemons2,
              accuracy2,
              damage1
            );
            if (x == 0) {
              damage1 = 0;
            }
          }

          // si el lento mato al rapido
          if (firstToAttack.hp < 1) {
            firstToAttack.hp = 0;
            console.log(`SE HA DEBILITADO ${firstToAttack.name}`);
            if (pokemonsLeftUser.includes(firstToAttack.name)) {
              pokemonsLeftUser = pokemonsLeftUser.filter((element) => {
                return element != firstToAttack.name;
              });
            } else
              pokemonsLeftRival = pokemonsLeftRival.filter((element) => {
                return element != firstToAttack.name;
              });
          }
        } else {
          secondToAttack.hp = 0;
          console.log(`SE HA DEBILITADO ${secondToAttack.name}`);
          if (pokemonsLeftUser.includes(secondToAttack.name)) {
            pokemonsLeftUser = pokemonsLeftUser.filter((element) => {
              return element != secondToAttack.name;
            });
          } else {
            pokemonsLeftRival = pokemonsLeftRival.filter((element) => {
              return element != secondToAttack.name;
            });
          }
        }
        statusFinal(firstToAttack);
        statusFinal(secondToAttack);
        console.log(
          `A ${secondToAttack.name} (${
            secondToAttack.status
          }) le queda ${Math.round(secondToAttack.hp)} ps `
        );
        console.log(
          `A ${firstToAttack.name} (${
            firstToAttack.status
          }) le queda ${Math.round(firstToAttack.hp)} ps`
        );
        console.log("-----------------------------");
      }
    }
  }
  if (pokemonsLeftUser.length > 0) {
    console.log(
      `Si señores! La victoria es para ${user.name} sobre su rival ${rival.name}`
    );
    user.pkm = initialPokemonsUser;
    return true;
  } else {
    console.log(
      `Malo qlio! La victoria es para ${rival.name} sobre tí, ${user.name}`
    );
    return false;
  }
};

const effectividad = function (moveType, pokemonTypes) {
  var x = 1;
  pokemonTypes.forEach((element) => {
    if (moveType.SuperEffective.includes(element.type)) {
      x *= 2;
    }
    if (moveType.notEffective.includes(element.type)) {
      x /= 2;
    }
    if (moveType.noEffect.includes(element.type)) {
      x *= 0;
    }
  });
  return x;
};

const stab = function (pokemonType, moveUser) {
  // return 1.5 si es igual el tipo de movimiento que el del pokemon
  var multiply = 1;
  pokemonType.forEach((element) => {
    if (element.type == moveUser.type) {
      multiply *= 1.5;
    }
  });
  return multiply;
};
const accuracy = function (moveAcurracy, pokemonAttack, pokemonTarget) {
  // return 1 o 0 si achunta o no achunta
  var si = "1".repeat(
    (moveAcurracy * pokemonAttack.accuracy) / pokemonTarget.evasion
  );
  var no = "0".repeat(
    100 - (moveAcurracy * pokemonAttack.accuracy) / pokemonTarget.evasion
  );
  var aleatorio = si + no;
  var missOrNot = aleatorio[Math.floor(Math.random() * aleatorio.length)];
  return missOrNot;
};

const daño = function (
  pokemonAtacante,
  pokemonDefensor,
  move,
  effectividad,
  stab,
  accuracy
) {
  var moveAtkOrSatk = move.classOfMove;
  var pokemonDefensorDfOrSdf;
  var pokemonAtacanteAtkOrSatk;
  // ver si es atk or satk
  if (moveAtkOrSatk == "atk") {
    pokemonDefensorDfOrSdf = pokemonDefensor.df;
    pokemonAtacanteAtkOrSatk = pokemonAtacante.atk;
  } else if (moveAtkOrSatk == "satk") {
    pokemonDefensorDfOrSdf = pokemonDefensor.sdf;
    pokemonAtacanteAtkOrSatk = pokemonAtacante.satk;
  }

  // calculo de daño
  return (
    0.01 *
    stab *
    effectividad *
    100 *
    (((0.2 * 50 * pokemonAtacanteAtkOrSatk * move.damage) /
      25 /
      pokemonDefensorDfOrSdf) *
      accuracy)
  );
};

const bestSpeed = function (pokemonUser, pokemonRival, moveUser, moveRival) {
  var firstToAttack;
  var secondToAttack;
  var preferenciaUser = moveUser.preferencia;
  var preferenciaRival = moveRival.preferencia;
  if (isNaN(preferenciaUser)) {
    preferenciaUser = 0;
  }
  if (isNaN(preferenciaRival)) {
    preferenciaRival = 0;
  }
  if (preferenciaRival != 0 || preferenciaUser != 0) {
    if (preferenciaUser > preferenciaRival) {
      firstToAttack = pokemonUser;
      secondToAttack = pokemonRival;
    } else {
      firstToAttack = pokemonRival;
      secondToAttack = pokemonUser;
    }
  } else if (pokemonUser.speed > pokemonRival.speed) {
    firstToAttack = pokemonUser;
    secondToAttack = pokemonRival;
  } else {
    firstToAttack = pokemonRival;
    secondToAttack = pokemonUser;
  }
  return { first: firstToAttack, second: secondToAttack };
};

// com elegir super effective
const rivalChooseWisely = function (pokemonUserTypes, pokemonRivalMoves) {
  var superEffectiveMoves = pokemonUserTypes.map((pokemonUserType) => {
    var posibleMovimiento = pokemonRivalMoves.map((moveRivalType) => {
      if (
        moveRivalType.typeOfMove.SuperEffective.includes(pokemonUserType.type)
      ) {
        return moveRivalType;
      } else {
        return "No";
      }
    });
    posibleMovimiento = posibleMovimiento.filter((element) => {
      return element != "No";
    });

    return posibleMovimiento;
  });
  superEffectiveMoves = superEffectiveMoves.filter((element) => {
    return element[0];
  });
  if (superEffectiveMoves.length > 1) {
    superEffectiveMoves = randomItem(superEffectiveMoves);
    if (Array.isArray(superEffectiveMoves)) {
      return superEffectiveMoves[0];
    }
  } else if (superEffectiveMoves.length == 1) {
    return randomItem(superEffectiveMoves[0]);
  } else {
    return randomItem(pokemonRivalMoves);
  }
};
const changePokemon = function (
  pokemonSelected,
  posiblesPokemon,
  pokemonsObject
) {
  console.log(`Has retirado a ${pokemonSelected.name} del combate`);
  console.log("Escoge a otro pokemon");
  posiblesPokemon = posiblesPokemon.filter((element) => {
    return element != pokemonSelected.name;
  });
  for (var i in posiblesPokemon) {
    console.log(`${i} - ${posiblesPokemon[i]}`);
  }
  var index = prompt();
  pokemonsObject = pokemonsObject.filter((element) => {
    return element.name == posiblesPokemon[index];
  });
  console.log(`Ha entrado ${pokemonsObject[0].name} al combate`);
  console.log("-----------------------------");

  return pokemonsObject[0];
};
const pokemonUseHisMove = function (
  pokemonUseMove,
  move,
  damage,
  efectividadMove,
  pokemonTarget,
  allPokemons,
  accuracy,
  damageTarget
) {
  if (isNaN(damage) && move.classOfMove == "ability") {
    allPokemons.forEach((initial) => {
      if (initial.name == pokemonUseMove.name) {
        if (Array.isArray(move.ability)) {
          move.ability.forEach((abilidad) => {
            abilidad(move.percentage, initial, pokemonUseMove, pokemonTarget);
          });
        } else {
          move.ability(move.percentage, initial, pokemonUseMove, pokemonTarget);
        }
      }
    });

    console.log(
      `${pokemonUseMove.name} realiza ${move.name} para ${move.afterUse}`
    );
    pokemonUseMove.turnsWiththeSameMove = 0;
  } else if (move.classOfMove == "status") {
    console.log(`${pokemonUseMove.name} usa ${move.name}`);

    if (move.damage == "protegerse") {
      if (pokemonUseMove.turnsWiththeSameMove == 0) {
        console.log(`${pokemonUseMove.name} se ha protegido`);
        pokemonUseMove.turnsWiththeSameMove += 1;
        return 0;
      }
      if (pokemonUseMove.turnsWiththeSameMove == 1) {
        pokemonUseMove.turnsWiththeSameMove += 1;
        var siOno = missOrNot(50, 50);
        if (siOno == 0) {
          console.log(`${pokemonUseMove.name} ha fallado protejerse`);
          pokemonUseMove.turnsWiththeSameMove = 0;
        } else {
          console.log(`${pokemonUseMove.name} se ha protegido`);
          return 0;
        }
      } else {
        console.log(`${pokemonUseMove.name} ha fallado protejerse`);
        pokemonUseMove.turnsWiththeSameMove = 0;
      }
    } else {
      pokemonUseMove.turnsWiththeSameMove = 0;

      if (accuracy == 1) {
        console.log("Y ACHUNTO !!!");
        pokemonTarget.status = move.abilityOfAttackMove.status;
      } else {
        console.log("Ataaaaack miss");
      }
    }
  } else {
    pokemonUseMove.turnsWiththeSameMove = 0;

    pokemonTarget.hp -= damage;
    console.log(
      `${pokemonUseMove.name} ataca con ${move.name} y le quita ${Math.round(
        damage
      )} de daño a ${pokemonTarget.name}`
    );

    if (damage > 0) {
      if (
        move.abilityOfAttackMove &&
        move.abilityOfAttackMove.statsChanger == false
      ) {
        var si = "1".repeat(move.abilityOfAttackMove.porcentaje);
        var no = "0".repeat(100 - move.abilityOfAttackMove.porcentaje);
        var aleatorio = si + no;
        var missOrNota =
          aleatorio[Math.floor(Math.random() * aleatorio.length)];
        if (missOrNota == 1) {
          pokemonTarget.status = move.abilityOfAttackMove.status;
          console.log(
            `${pokemonTarget.name} ha sido ${move.abilityOfAttackMove.status} `
          );
        }
      }
      if (move.abilityOfAttackMove && move.abilityOfAttackMove.statsChanger) {
        var si = "1".repeat(move.abilityOfAttackMove.porcentajeAcierto);
        var no = "0".repeat(100 - move.abilityOfAttackMove.porcentajeAcierto);
        var aleatorio = si + no;
        var missOrNota =
          aleatorio[Math.floor(Math.random() * aleatorio.length)];
        if (missOrNota == 1) {
          move.abilityOfAttackMove.statsChanger(
            move.abilityOfAttackMove.porcentajeParaCambiar,
            pokemonUseMove,
            pokemonUseMove,
            pokemonTarget
          );
          console.log(`${pokemonTarget.name} le bajo su estadistica `);
        }
      }
      if (efectividadMove > 1) {
        console.log("Its super effective!");
      } else if (efectividadMove < 1) {
        console.log("Its not effective");
      }
    } else {
      console.log("Attaaaaaackk misss");
    }
  }
};

const statusFinal = function (pokemonNow, pokemonInitial) {
  if (
    (pokemonNow.status == "envenenado" || pokemonNow.status == "quemado") &&
    pokemonNow.hp > 0
  ) {
    pokemonNow.hp -= 15;
    console.log(
      `${pokemonNow.name} pierde ps debido a que esta ${pokemonNow.status} `
    );
  }
};

const statusInitial = function (pokemonNow, damageTargetTo) {
  if (pokemonNow.status == "paralizado") {
    pokemonNow.speed -= pokemonNow.speed * 0.5;
    return missOrNot(75, 25);
  } else if (pokemonNow.status == "dormido") {
    if (pokemonNow.turnsWithStatus == undefined) {
      pokemonNow.turnsWithStatus = 1;
    }
    if (pokemonNow.turnsWithStatus <= 3) {
      pokemonNow.turnsWithStatus += 1;
      var despiertaONo = missOrNot(40, 60);
      if (despiertaONo <= 1) {
        return 0;
      } else {
        pokemonNow.status = "";
        pokemonNow.turnsWithStatus = "";
        console.log(`${pokemonNow.name} ha despertado!`);
      }
    } else {
      pokemonNow.status = "";
      pokemonNow.turnsWithStatus = "";
      console.log(`${pokemonNow.name} ha despertado!`);
    }
  } else {
    return 1;
  }
};

const missOrNot = function (siN, noN) {
  var si = "1".repeat(siN);
  var no = "0".repeat(noN);
  var aleatorio = si + no;
  var missOrNotH = aleatorio[Math.floor(Math.random() * aleatorio.length)];
  return missOrNotH;
};
const elegirBienUser = function () {
  let indexofmove = prompt();
  while (
    indexofmove != 0 &&
    indexofmove != 1 &&
    indexofmove != 2 &&
    indexofmove != 3 &&
    indexofmove != 4
  ) {
    console.log("Elige bien po qlio");
    indexofmove = prompt();
  }
  return indexofmove;
};
module.exports = battle;
