//Load pokemon list

async function fetchPokemon(page=1){
  const offset=(page-1)*limit;
  const response=await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)

  const data=await response.json();

  const pokemonDetails=await Promise.all(
    data.results.map(p=>fetch(p.url).then(res=>res.json))
  );
  allpokemon=pokemonDetails;
  filteredPokemon=[...allpokemon];
  renderPokemon(filteredPokemon);
}
