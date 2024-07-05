const status = {
  quemado: function (
    percentage,
    pokemonInitial,
    pokemonInBattle, //el del que uso el ataque
    pokemonRival // al que hay que bajarle
  ) {
    pokemonRival.status = "quemado";
  },
  dormido: function (
    percentage,
    pokemonInitial,
    pokemonInBattle, //el del que uso el ataque
    pokemonRival // al que hay que bajarle
  ) {
    pokemonRival.status = "dormido";
  },
};
module.exports = status;
