/* bug 1: add # in front of id string */
// const sprite = document.getElementById('#poke-sprite');
const sprite = document.getElementById('poke-sprite');
const pokeName = document.getElementById('poke-name');
const pokeNumber = document.getElementById('poke-number');
const pokeType = document.getElementById('poke-type');
/* bug 2: write wrong id */
// const hp = document.getElementById('poke-hp');
const hp = document.getElementById('poke-stats-hp');
const attack = document.getElementById('poke-stats-atk');
const defense = document.getElementById('poke-stats-def');
const spAttack = document.getElementById('poke-stats-spa');
const spDefense = document.getElementById('poke-stats-spd');
const speed = document.getElementById('poke-stats-speed');
const hpBar = document.getElementById('stat-bar-hp');
const attackBar = document.getElementById('stat-bar-atk');
const defenseBar = document.getElementById('stat-bar-def');
const spAttackBar = document.getElementById('stat-bar-spa');
const spDefenseBar = document.getElementById('stat-bar-spd');
const speedBar = document.getElementById('stat-bar-speed');

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-bar-choice');
const searchDropdown = document.getElementById('search-bar-options');

const surprisBtn = document.getElementById('surprise-btn');

const allPokemon = [];

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function getRandomNumber() {
  const randomnum = Math.floor(Math.random() * allPokemon.length)
  return randomnum
}

function setStat(statEl, statBarEl, baseValue) {
  const statPercentage = `${(baseValue/160) * 100}%`;
    statEl.textContent = baseValue;
    statBarEl.style.width = statPercentage;
}

function setStats(stats) {
  stats.forEach(stat => {
    const name = stat.stat.name;
    const baseStat = stat.base_stat;
    if(name === "hp"){
      setStat(hp, hpBar, baseStat);
    }
    if(name === "attack"){
      setStat(attack, attackBar, baseStat);
    }
    if(name === "defense"){
      setStat(defense, defenseBar, baseStat);
    }
    if(name === "special-attack"){
      setStat(spAttack, spAttackBar, baseStat);
    }
    if(name === "special-defense"){
      setStat(spDefense, spDefenseBar, baseStat);
    }
    if(name === "speed"){
      setStat(speed, speedBar, baseStat);
    }
  })
}

function resetPokedex(){
  sprite.src = './assets/images/confused-pikachu.png';
  pokeName.textContent = 'Not found';
  pokeNumber.textContent = "???";
  pokeType.textContent = "???"
  setStat(hp, hpBar, 0);
  setStat(attack, attackBar, 0);
  setStat(defense, defenseBar, 0);
  setStat(spAttack, spAttackBar, 0);
  setStat(spDefense, spDefenseBar, 0);
  setStat(speed, speedBar, 0);
}

function updatePokedex(pokemonData){
  /* bug 3: sprite is not a thing; console log the data to check */
  sprite.src = pokemonData.sprite;
  sprite.src = pokemonData.sprites.front_default;
  pokeName.textContent = capitalize(pokemonData.name);
  pokeNumber.textContent = pokemonData.id;
  /* bug 4: typo type instead of types */
  // type.textContent = data.type.type.name;
  pokeType.textContent = capitalize(pokemonData.types[0].type.name);
  setStats(pokemonData.stats);
}

async function findPokemon(name) {
  await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => response.json())
    .then((data) => {
      updatePokedex(data);
      searchInput.value = "";
    })
    .catch(() => {
      resetPokedex();
    })
}

function createDropdownItem(pokemonName){
  const option = document.createElement('option');
  option.value = pokemonName;
  searchDropdown.appendChild(option);
}

async function getAllPokemons(){
  await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0')
    .then(response => response.json())
    .then(data => {
      data.results.forEach((pokemon) => {
        allPokemon.push(pokemon.name);
        createDropdownItem(pokemon.name);
      })
    })
}

function getDefaultPokemon(){
  const DEFAULT_POKEMON = 'eevee';
  findPokemon(DEFAULT_POKEMON);
}

searchBtn.addEventListener('click', () => {
  findPokemon(searchInput.value);
})

searchInput.addEventListener('keypress', (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    findPokemon(searchInput.value);
  }
})

surprisBtn.addEventListener('click', () => {
  const randomIndex = getRandomNumber();
  findPokemon(randomIndex);
})

getDefaultPokemon();
getAllPokemons();

/* bug 5: what happens if we type in 1000? */ 
/* bug 6: what happens if we type in 900? */ 