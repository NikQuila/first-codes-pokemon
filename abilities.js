const abilities = {
  attackUp: function (percentage, pokemonInitial, pokemonInBattle) {
    pokemonInBattle.atk += (pokemonInitial.atk * percentage) / 100;
  },
  defenseUp: function (percentage, pokemonInitial, pokemonInBattle) {
    pokemonInBattle.df += (pokemonInitial.df * percentage) / 100;
  },
  specialAttackUp: function (percentage, pokemonInitial, pokemonInBattle) {
    pokemonInBattle.satk += (pokemonInitial.satk * percentage) / 100;
  },
  specialDefenseUp: function (percentage, pokemonInitial, pokemonInBattle) {
    pokemonInBattle.sdf += (pokemonInitial.sdf * percentage) / 100;
  },
  attackRivalLow: function (
    percentage,
    pokemonInitial,
    pokemonInBattle, //el del que uso el ataque
    pokemonRival // al que hay que bajarle
  ) {
    pokemonRival.atk -= (pokemonRival.atk * percentage) / 100;
  },
  specialAttackRivalLow: function (
    percentage,
    pokemonInitial,
    pokemonInBattle, //el del que uso el ataque
    pokemonRival // al que hay que bajarle
  ) {
    pokemonRival.satk -= (pokemonRival.satk * percentage) / 100;
  },
  defenseRivalLow: function (
    percentage,
    pokemonInitial,
    pokemonInBattle, //el del que uso el ataque
    pokemonRival // al que hay que bajarle
  ) {
    pokemonRival.df -= (pokemonRival.df * percentage) / 100;
  },
  specialDefenseRivalLow: function (
    percentage,
    pokemonInitial,
    pokemonInBattle, //el del que uso el ataque
    pokemonRival // al que hay que bajarle
  ) {
    pokemonRival.sdf -= (pokemonRival.sdf * percentage) / 100;
  },
  accuracyUp: function (percentage, pokemonInitial, pokemonInBattle) {
    pokemonInBattle.accuracy += (pokemonInitial.accuracy * percentage) / 100;
  },
  accuracyRivalLow: function (
    percentage,
    pokemonInitial,
    pokemonInBattle, //el del que uso el ataque
    pokemonRival // al que hay que bajarle
  ) {
    pokemonRival.accuracy -= (pokemonRival.accuracy * percentage) / 100;
  },
  evasionUp: function (percentage, pokemonInitial, pokemonInBattle) {
    pokemonInBattle.evasion += (pokemonInitial.evasion * percentage) / 100;
  },
  evasionRivalLow: function (
    percentage,
    pokemonInitial,
    pokemonInBattle, //el del que uso el ataque
    pokemonRival // al que hay que bajarle
  ) {
    pokemonRival.evasion -= (pokemonRival.evasion * percentage) / 100;
  },
};
module.exports = abilities;
