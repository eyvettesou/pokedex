/* bug 1: add # in front of id string */
// const sprite = document.getElementById('#poke-sprite');
const sprite = document.getElementById('poke-sprite');
const pokeName = document.getElementById('poke-name');
const pokeNumber = document.getElementById('poke-number');
const type = document.getElementById('poke-type');
/* bug 2: write wrong id */
// const hp = document.getElementById('poke-hp');
const hp = document.getElementById('poke-stats-hp');
const attack = document.getElementById('poke-stats-atk');
const defense = document.getElementById('poke-stats-def');
const spAttack = document.getElementById('poke-stats-spa');
const spDefense = document.getElementById('poke-stats-spd');
const speed = document.getElementById('poke-stats-speed');

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function setStats(stats) {
  stats.forEach(stat => {
    if(stat.stat.name === "hp"){
      hp.textContent = stat.base_stat;
    }
    if(stat.stat.name === "attack"){
      attack.textContent = stat.base_stat;
    }
    if(stat.stat.name === "defense"){
      defense.textContent = stat.base_stat;
    }
    if(stat.stat.name === "special-attack"){
      spAttack.textContent = stat.base_stat;
    }
    if(stat.stat.name === "special-defense"){
      spDefense.textContent = stat.base_stat;
    }
    if(stat.stat.name === "speed"){
      speed.textContent = stat.base_stat;
    }
  })
}

async function getDefaultPokemon () {
  const DEFAULT_POKEMON = 'eevee'
  await fetch(`https://pokeapi.co/api/v2/pokemon/${DEFAULT_POKEMON}`)
    .then((response) => response.json())
    .then((data) => {
      sprite.src = data.sprites.front_default;
      pokeName.textContent = capitalize(data.name);
      pokeNumber.textContent = data.id;
      /* bug 3: typo type instead of types */
      // type.textContent = data.type.type.name;
      type.textContent = capitalize(data.types[0].type.name);
      setStats(data.stats);
    })
}

getDefaultPokemon();