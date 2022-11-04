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
const hpBar = document.getElementById('stat-bar-hp');
const attackBar = document.getElementById('stat-bar-atk');
const defenseBar = document.getElementById('stat-bar-def');
const spAttackBar = document.getElementById('stat-bar-spa');
const spDefenseBar = document.getElementById('stat-bar-spd');
const speedBar = document.getElementById('stat-bar-speed');

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function setStats(stats) {
  stats.forEach(stat => {
    const statName = stat.stat.name;
    const baseStat = stat.base_stat;
    const statPercentage = `${(baseStat/200) * 100}%`;

    if(statName === "hp"){
      hp.textContent = baseStat;
      hpBar.style.width = statPercentage;
    }
    if(statName === "attack"){
      attack.textContent = baseStat;
      attackBar.style.width = statPercentage;
    }
    if(statName === "defense"){
      defense.textContent = baseStat;
      defenseBar.style.width = statPercentage;
    }
    if(statName === "special-attack"){
      spAttack.textContent = baseStat;
      spAttackBar.style.width = statPercentage;
    }
    if(statName === "special-defense"){
      spDefense.textContent = baseStat;
      spDefenseBar.style.width = statPercentage;
    }
    if(statName === "speed"){
      speed.textContent = baseStat;
      speedBar.style.width = statPercentage;
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