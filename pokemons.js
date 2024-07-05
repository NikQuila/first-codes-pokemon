const Pokemon = require("./pokemonClass");
const type = require("./typeClass");
const moves = require("./movesClass");
var pokemons = {
  pikachu: new Pokemon(
    "Pikachu",
    [type.electric],
    142,
    107,
    102,
    92,
    102,
    142,
    [moves.thunder, moves.thunderBolt, moves.thunderWave, moves.ironTail]
  ),
  gyarados: new Pokemon(
    "Gyarados",
    [type.water, type.flying],
    202,
    177,
    112,
    131,
    152,
    133,
    [moves.waterfall, moves.outrage, moves.swordDance, moves.fly]
  ),
  charizard: new Pokemon(
    "Charizard",
    [type.fire, type.flying],
    185,
    136,
    161,
    130,
    137,
    152,
    [moves.fireBlast, moves.firePunch, moves.fly, moves.protect]
  ),
  blastoise: new Pokemon(
    "Blastoise",
    [type.water],
    186,
    135,
    137,
    152,
    157,
    130,
    [moves.hydroPump, moves.thunderPunch, moves.ironHead, moves.iceBeam]
  ),
  venusaur: new Pokemon(
    "Venusaur",
    [type.plant, type.poison],
    187,
    134,
    152,
    135,
    152,
    118,
    [moves.energyBall, moves.sludgeBomb, moves.bodySlam, moves.sleepPowder]
  ),
  snorlax: new Pokemon("Snorlax", [type.normal], 267, 162, 117, 117, 162, 82, [
    moves.earthqueake,
    moves.bodySlam,
    moves.hammerArm,
    moves.crunch,
  ]),
  lapras: new Pokemon(
    "Lapras",
    [type.water, type.ice],
    237,
    137,
    137,
    132,
    147,
    112,
    [moves.iceBeam, moves.bodySlam, moves.hydroPump, moves.thunderBolt]
  ),
  arcanine: new Pokemon("Arcanine", [type.fire], 197, 162, 152, 132, 132, 147, [
    moves.fireBlast,
    moves.snarl,
    moves.thunderFang,
    moves.extremeSpeed,
  ]),
  pidgeot: new Pokemon(
    "Pidgeot",
    [type.normal, type.flying],
    190,
    132,
    122,
    127,
    122,
    153,
    [moves.fly, moves.steelWing, moves.doubleTeam, moves.sandAttack]
  ),
  gengar: new Pokemon(
    "Gengar",
    [type.ghost, type.poison],
    167,
    117,
    182,
    112,
    127,
    162,
    [moves.shadowBall, moves.sludgeBomb, moves.psychic, moves.hypnosis]
  ),
  ninetales: new Pokemon(
    "Ninetales",
    [type.fire],
    180,
    128,
    133,
    127,
    152,
    152,
    [moves.fireBlast, moves.snarl, moves.crunch, moves.thunderFang]
  ),
  sceptile: new Pokemon(
    "Sceptile",
    [type.plant],
    177,
    137,
    157,
    117,
    137,
    172,
    [moves.leafBlade, moves.toxic, moves.crunch, moves.dragonPulse]
  ),
  greninja: new Pokemon(
    "Greninja",
    [type.water, type.dark],
    179,
    147,
    155,
    119,
    123,
    174,
    [moves.hydroPump, moves.darkPulse, moves.slash, moves.nightSlash]
  ),
  electivire: new Pokemon(
    "Electivire",
    [type.electric],
    182,
    175,
    147,
    119,
    137,
    147,
    [moves.thunder, moves.thunderPunch, moves.firePunch, moves.hammerArm]
  ),
  nidoking: new Pokemon(
    "Nidoking",
    [type.ground, type.poison],
    188,
    154,
    137,
    129,
    127,
    137,
    [moves.earthqueake, moves.sludgeBomb, moves.megaHorn, moves.rockSlide]
  ),
  alakazam: new Pokemon(
    "Alakazam",
    [type.psychic],
    162,
    102,
    97,
    187,
    147,
    172,
    [moves.psychic, moves.shadowBall, moves.calmMind, moves.hypnosis]
  ),
  dragonite: new Pokemon(
    "Dragonite",
    [type.dragon, type.flying],
    198,
    186,
    152,
    147,
    152,
    132,
    [moves.outrage, moves.fly, moves.thunderPunch, moves.swordDance]
  ),
  kingdra: new Pokemon(
    "Kingdra",
    [type.dragon, type.water],
    182,
    147,
    147,
    147,
    147,
    137,
    [moves.outrage, moves.hydroPump, moves.iceBeam, moves.bodySlam]
  ),
  aerodactyl: new Pokemon(
    "Aerodactyl",
    [type.rock, type.flying],
    187,
    157,
    112,
    117,
    127,
    182,
    [moves.rockSlide, moves.fly, moves.earthqueake, moves.sandAttack]
  ),
  garchomp: new Pokemon(
    "Garchomp",
    [type.dragon, type.ground],
    215,
    182,
    132,
    147,
    137,
    154,
    [moves.outrage, moves.crunch, moves.earthqueake, moves.swordDance]
  ),
  spiritomb: new Pokemon(
    "Spiritomb",
    [type.ghost, type.dark],
    157,
    144,
    144,
    160,
    160,
    87,
    [moves.darkPulse, moves.shadowBall, moves.protect, moves.doubleTeam]
  ),
  milotic: new Pokemon("Milotic", [type.water], 202, 112, 152, 131, 177, 133, [
    moves.hydroPump,
    moves.iceBeam,
    moves.hypnosis,
    moves.darkPulse,
  ]),
};

module.exports = pokemons;
