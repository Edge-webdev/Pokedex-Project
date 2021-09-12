const pokemonName = document.querySelector('.pokemon-name');
const pokemonSprite = document.querySelector('.pokemon-sprite');
const pokemonID = document.querySelector('.pokemon-id');
const pokemonAbility = document.querySelector('.ability');
const pokemonSA = document.querySelector('.secret-ability');
const pokemonType1 = document.querySelector('.type1');
const pokemonType2 = document.querySelector('.type2');
const pokemonEggGroup = document.querySelector('.egg-group');

var id = 1;

fetchAPIData();

async function fetchAPIData() {
  // Fetches two sets of data
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  const data = await res.json();
  const data2 = await res2.json();

  // Object to store shortened forms of data
  var pokemon = {
    poke_name: data.species.name,
    poke_img: data.sprites.front_default,
    poke_type1: data.types[0].type.name,
    poke_type2: data.types[1] ? data.types[1].type.name : undefined,
    poke_ability: data.abilities[0].ability.name,
    poke_SA: data.abilities[2]
      ? data.abilities[2].ability.name
      : data.abilities[1]
      ? data.abilities[1].ability.name
      : undefined,
    poke_eggGroup1: data2.egg_groups[0] ? data2.egg_groups[0].name : undefined,
    poke_eggGroup2: data2.egg_groups[1] ? data2.egg_groups[1].name : undefined,
  };

  // Variables to store capitalized data or converts them to undefined
  var name = pokemon.poke_name[0].toUpperCase() + pokemon.poke_name.slice(1);
  var type1 = pokemon.poke_type1[0].toUpperCase() + pokemon.poke_type1.slice(1);
  var type2 = pokemon.poke_type2
    ? pokemon.poke_type2[0].toUpperCase() + pokemon.poke_type2.slice(1)
    : undefined;
  var ability =
    pokemon.poke_ability[0].toUpperCase() + pokemon.poke_ability.slice(1);
  var secretAbility = pokemon.poke_SA
    ? pokemon.poke_SA[0].toUpperCase() + pokemon.poke_SA.slice(1)
    : undefined;
  var eggGroup1 = pokemon.poke_eggGroup1
    ? pokemon.poke_eggGroup1[0].toUpperCase() + pokemon.poke_eggGroup1.slice(1)
    : undefined;
  var eggGroup2 = pokemon.poke_eggGroup2
    ? pokemon.poke_eggGroup2[0].toUpperCase() + pokemon.poke_eggGroup2.slice(1)
    : undefined;

  // Changes the web page based on ID
  pokemonName.innerHTML = name;
  pokemonSprite.src = pokemon.poke_img;
  pokemonType1.innerHTML = type1;
  pokemonType2.innerHTML = type2 ? type2 : 'None';
  pokemonAbility.innerHTML = ability;
  pokemonSA.innerHTML = secretAbility ? secretAbility : 'None';
  pokemonID.innerHTML = `ID: ${id}`;
  pokemonEggGroup.innerHTML = eggGroup2
    ? `Egg Groups: ${eggGroup1}, ${eggGroup2}`
    : eggGroup1
    ? `Egg Group: ${eggGroup1}`
    : 'Egg Group: None';
}

function nextPokemon() {
  id++;
  if (id > 898) {
    id = 1;
  }
  fetchAPIData();
}

function previousPokemon() {
  id--;
  if (id <= 0) {
    id = 898;
  }
  fetchAPIData();
}
