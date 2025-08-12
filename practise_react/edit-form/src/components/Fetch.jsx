import React, { useEffect, useState } from "react";

export default function FetchPokemon(){
  const[pokemon,setPokemon]=useState([]);
  const[error,setError]=useState(null);
  useEffect(()=>{
    async function fetchPokemon() {
      try {
        setError(null);
        const res=await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
        if(!res.ok) throw new Error("Failed to fetch")
          const data=await res.json();
          setPokemon(data.results)

      } catch (error) {
        setError(error.message);
      }
    }
    fetchPokemon();
  },[]);
if(pokemon.length===0) return <p>Loading....</p>
if(error) return <p>Error:{error}</p>

return(
  <div>
    <ul>{pokemon.map((p)=>(
      <li key={p.name}>{p.name}</li>
    ))}</ul>
  </div>
)
}