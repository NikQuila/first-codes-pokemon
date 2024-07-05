const type = require("./typeClass");
const status = require("./status");
const {
  attackUp,
  defenseUp,
  attackRivalLow,
  specialDefenseUp,
  specialAttackUp,
  evasionUp,
  evasionRivalLow,
  accuracyRivalLow,
  specialDefenseRivalLow,
  specialAttackRivalLow,
} = require("./abilities");
const { dormido } = require("./status");
const Move = class Move {
  constructor(
    name,
    typeOfMove,
    classOfMove,
    damage,
    accuracy,
    abilityOfAttackMove,
    preferencia
  ) {
    this.name = name;
    this.typeOfMove = typeOfMove;
    this.classOfMove = classOfMove;
    this.damage = damage;
    this.accuracy = accuracy;
    this.abilityOfAttackMove = abilityOfAttackMove;
    this.preferencia = preferencia;
  }
};
const Ability = class Ability {
  constructor(
    name,
    typeOfMove,
    classOfMove,
    ability,
    percentage,
    description,
    afterUse
  ) {
    this.name = name;
    this.typeOfMove = typeOfMove;
    this.classOfMove = classOfMove;
    this.ability = ability;
    this.percentage = percentage;
    this.description = description;
    this.afterUse = afterUse;
  }
};

var allMoves = {
  // fuego
  firePunch: new Move("Fire Punch", type.fire, "atk", 75, 100, {
    statsChanger: undefined,
    status: "quemado",
    porcentaje: 10,
  }),

  flameThrower: new Move("Flamethrower", type.fire, "satk", 90, 100, undefined),
  fireBlast: new Move("Fire Blast", type.fire, "satk", 110, 85, {
    statsChanger: undefined,
    status: "quemado",
    porcentaje: 100,
  }),
  // agua
  waterfall: new Move("Waterfall", type.water, "atk", 80, 100, undefined),
  hydroPump: new Move("Hydro Pump", type.water, "satk", 110, 80, undefined),
  // planta
  woodHammer: new Move("Wood Hammer", type.plant, "atk", 120, 100, undefined),
  leafBlade: new Move("Leaf Blade", type.plant, "atk", 95, 100, undefined),

  petalBlizzard: new Move(
    "Petal Blizzard",
    type.plant,
    "atk",
    90,
    100,
    undefined
  ),
  energyBall: new Move("Energy Ball", type.plant, "satk", 90, 100, undefined),
  sleepPowder: new Move("Sleep Powder", type.plant, "status", "dormir", 75, {
    statsChanger: undefined,
    status: "dormido",
    porcentaje: 100,
  }),
  // electric
  thunderWave: new Move(
    "Thunder Wave",
    type.electric,
    "status",
    "paralizar",
    90,
    {
      statsChanger: undefined,
      status: "paralizado",
      porcentaje: 100,
    }
  ),
  thunder: new Move("Thunder", type.electric, "satk", 110, 70, undefined),
  thunderPunch: new Move(
    "Thunder Punch",
    type.electric,
    "atk",
    75,
    100,
    undefined
  ),
  thunderBolt: new Move(
    "Thunderbolt",
    type.electric,
    "satk",
    90,
    100,
    undefined
  ),
  thunderFang: new Move(
    "Thunder Fang",
    type.electric,
    "atk",
    65,
    95,
    undefined
  ),
  // dragon
  dragonPulse: new Move(
    "Dragon Pulse",
    type.dragon,
    "satk",
    85,
    100,
    undefined
  ),
  outrage: new Move("Outrage", type.dragon, "atk", 120, 100, undefined),
  // ice
  blizzard: new Move("Blizzard", type.ice, "satk", 110, 70, undefined),
  iceBeam: new Move("IceBeam", type.ice, "satk", 90, 100, undefined),
  icePunch: new Move("Ice Punch", type.ice, "atk", 75, 100, undefined),
  // psiquico
  hypnosis: new Move("Hypnosis", type.psychic, "status", "dormir", 75, {
    statsChanger: undefined,
    status: "dormido",
    porcentaje: 100,
  }),
  psychic: new Move("Psychic", type.psychic, "satk", 90, 100, {
    statsChanger: specialDefenseRivalLow,
    porcentajeAcierto: 10,
    porcentajeParaCambiar: 10,
  }),
  psychicFangs: new Move(
    "Psychic Fangs",
    type.psychic,
    "satk",
    110,
    70,
    undefined
  ),
  calmMind: new Ability(
    "Calm Mind",
    type.psychic,
    "ability",
    [specialAttackUp, specialDefenseUp],
    33,
    "up attack and defense in 33%",
    "subir su ataque especial y defensa especial"
  ),

  // dark
  foulPlay: new Move("Foul Play", type.dark, "atk", 95, 100, undefined),
  darkPulse: new Move("Dark Pulse", type.dark, "satk", 80, 100),
  crunch: new Move("Crunch", type.dark, "atk", 80, 100, undefined),
  nightSlash: new Move("Night Slash", type.dark, "atk", 70, 100, undefined),
  snarl: new Move("Snarl", type.dark, "satk", 55, 95, {
    statsChanger: specialAttackRivalLow,
    porcentajeAcierto: 100,
    porcentajeParaCambiar: 33,
  }),

  // acero
  steelWing: new Move("Steel Wing", type.steel, "atk", 70, 100, undefined),
  ironHead: new Move("Iron Head", type.steel, "atk", 80, 100, undefined),
  ironTail: new Move("Iron Tail", type.steel, "atk", 100, 75, undefined),
  flashCannon: new Move("Flash Cannon", type.steel, "satk", 80, 100, undefined),
  meteorMash: new Move("Meteor Mash", type.steel, "atk", 90, 90, undefined),
  // bicho
  pollenPuff: new Move("Pollen Puff", type.bug, "satk", 90, 100, undefined),
  megaHorn: new Move("Mega Horn", type.bug, "atk", 120, 85, undefined),
  // fanstasma
  shadowClaw: new Move("Shadow Claw", type.ghost, "atk", 70, 100, undefined),
  shadowBall: new Move("Shadow Ball", type.ghost, "satk", 80, 100, undefined),
  // lucha
  auraSphere: new Move("Aura Sphere", type.fight, "satk", 80, 100, undefined),
  hammerArm: new Move("Hammer Arm", type.fight, "atk", 100, 90, undefined),
  closeCombat: new Move("Close Combat", type.fight, "atk", 120, 100, undefined),
  crossChop: new Move("Cross Chop", type.fight, "atk", 100, 80, undefined),
  // normal
  protect: new Move(
    "Protect",
    type.normal,
    "status",
    "protegerse",
    100,
    {
      statsChanger: undefined,
      status: "protegido",
      porcentaje: 100,
    },
    3
  ),
  triAttack: new Move("Tri Attack", type.normal, "satk", 80, 100, undefined),
  judgment: new Move("Judgment", type.normal, "satk", 100, 100, undefined),
  bodySlam: new Move("Body Slam", type.normal, "atk", 85, 100, undefined),
  slash: new Move("Slash", type.normal, "atk", 70, 100, undefined),
  extremeSpeed: new Move(
    "Extreme Speed",
    type.normal,
    "atk",
    80,
    100,
    undefined,
    2
  ),
  growl: new Ability(
    "Growl",
    type.normal,
    "ability",
    attackRivalLow,
    33,
    "down attack pokemon enemy in 33%",
    "bajarle el ataque al rival"
  ),
  swordDance: new Ability(
    "Sword Dance",
    type.normal,
    "ability",
    attackUp,
    100,
    "more atk in 100%",
    "subir su ataque mucho"
  ),
  harden: new Ability(
    "Harden",
    type.normal,
    "ability",
    defenseUp,
    50,
    "more defense in 50%",
    "subir su defensa"
  ),
  doubleTeam: new Ability(
    "Double Team",
    type.normal,
    "ability",
    evasionUp,
    50,
    "more evasion in 50%",
    "subir su evasion"
  ),

  // roca
  powerGem: new Move("Power Gem", type.rock, "satk", 80, 100, undefined),
  stoneEdge: new Move("Stone Edge", type.rock, "atk", 100, 80, undefined),
  rockSlide: new Move("Rock Slide", type.rock, "atk", 75, 90, undefined),
  // tierra
  sandAttack: new Ability(
    "Sand Attack",
    type.ground,
    "ability",
    accuracyRivalLow,
    33,
    "low accuracy Rival in 50%",
    "bajarle la precision al rival"
  ),
  earthqueake: new Move("Earthquake", type.ground, "atk", 100, 100, undefined),
  earthPower: new Move("Earth Power", type.ground, "satk", 90, 100, undefined),
  // poison
  toxic: new Move("Toxic", type.poison, "status", "envenenar", 90, {
    statsChanger: undefined,
    status: "envenenado",
    porcentaje: 100,
  }),
  poisonJab: new Move("Poison Jab", type.poison, "atk", 80, 100, undefined),
  sludgeBomb: new Move("Sludge Bomb", type.poison, "satk", 90, 100, undefined),
  // volador
  fly: new Move("Fly", type.flying, "atk", 90, 100, undefined),
  airSlash: new Move("Air Slash", type.flying, "satk", 75, 95, undefined),
  // hada
  playRough: new Move("Play Rough", type.fairy, "atk", 90, 90, undefined),
  moonblast: new Move("Moonblast", type.fairy, "satk", 95, 100, undefined),
};

module.exports = allMoves;
