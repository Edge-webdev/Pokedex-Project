// Grabs DOM elements
const pokemonContainer = document.querySelector('.container');

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
    poke_name: formatString(data.species.name),
    poke_img: data.sprites.front_default,
    poke_type1: formatString(data.types[0].type.name),
    poke_type2: formatString(
      data.types[1] ? data.types[1].type.name : undefined
    ),
    poke_ability: formatString(data.abilities[0].ability.name),
    poke_SA: formatString(
      data.abilities[2]
        ? data.abilities[2].ability.name
        : data.abilities[1]
        ? data.abilities[1].ability.name
        : undefined
    ),
    poke_eggGroup1: formatString(
      data2.egg_groups[0] ? data2.egg_groups[0].name : undefined
    ),
    poke_eggGroup2: formatString(
      data2.egg_groups[1] ? data2.egg_groups[1].name : undefined
    ),
  };

  // Changes the web page based on ID
  pokemonContainer.innerHTML = `<div class="button-container">
  <button class="nextPokemon" onclick="nextPokemon()">
    <i class="fas fa-arrow-right"></i>
  </button>
  <button class="previousPokemon" onclick="previousPokemon()">
    <i class="fas fa-arrow-left"></i>
  </button>
</div>
<div class="pokemon-container">
  <header class="pokemon-header">
    <h2 class="pokemon-name">${pokemon.poke_name}</h2>
    <img src="${
      pokemon.poke_img
    }" class="pokemon-sprite" alt="Pokemon sprite" />
  </header>
  <section class="pokemon-info">
    <h3 class="subtitle">Pokemon Type</h3>
    <div class="pokemon-type">
      <p class="type1">${pokemon.poke_type1}</p>
      <p class="type2">${pokemon.poke_type2 ? pokemon.poke_type2 : 'None'}</p>
    </div>
    <h3 class="subtitle">Abilities</h3>
    <div class="pokemon-ability">
      <p class="ability">${pokemon.poke_ability}</p>
      <h4 class="subtitle">Secret Ability</h4>
      <p class="secret-ability">${
        pokemon.poke_SA ? pokemon.poke_SA : 'None'
      }</p>
    </div>
    <h3 class="subtitle">Miscellanous information</h3>
    <div class="extra-info">
      <p class="pokemon-id">ID: ${id}</p>
      <p class="egg-group">${
        pokemon.poke_eggGroup2
          ? `Egg Groups: ${pokemon.poke_eggGroup1}, ${pokemon.poke_eggGroup2}`
          : pokemon.poke_eggGroup1
          ? `Egg Group: ${pokemon.poke_eggGroup1}`
          : 'Egg Group: None'
      }</p>
    </div>
  </section>
</div>`;
}

// Function to format strings
function formatString(str) {
  // Checks if input is undefined
  if (str) {
    // Removes hyphens and capitalizes the words in the string
    var newStr = str.split('-');
    for (var i = 0; i < newStr.length; i++) {
      newStr[i] = newStr[i][0].toUpperCase() + newStr[i].slice(1);
    }
    return newStr.join(' ');
  } else {
    return;
  }
}

function nextPokemon() {
  id++;
  // Loops around if it tries to go beyond the highest ID
  if (id > 898) {
    id = 1;
  }

  // Updates page
  fetchAPIData();
}

function previousPokemon() {
  id--;
  // Loops around if goes to the negatives
  if (id <= 0) {
    id = 898;
  }

  // Updates page
  fetchAPIData();
}
