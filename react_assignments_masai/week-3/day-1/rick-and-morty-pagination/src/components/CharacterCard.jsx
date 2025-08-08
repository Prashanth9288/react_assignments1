import React, { useEffect, useState } from "react";

function RickAndMortyCharacters(){
  const [characters,setCharacters]=useState([]);
  const[apiPage,setApiPage]=useState(1)
  const[loading,setLoading]=useState(true)

  useEffect(()=>{
    setLoading(true);
    fetch(`https://rickandmortyapi.com/api/character?page=${apiPage}`)
    .then((res)=>res.json())
    .then((data)=>{
      setCharacters(data.results);
      setLoading(false);
    })
    .catch((error)=>{
      console.error("Error fetching characters:",error);

      setLoading(false);
    })
  },[apiPage]);

  return(
    <div>
      <h1>Rick and Morty Characters</h1>
      {loading ? (
        <p>Loading...</p>
      ):(
        <ul>
          {characters.map((characters)=>(
            <li key={characters.id}>
              <img src={characters.image} alt={characters.name} width={50}/>{characters.name}
            </li>
          )
        )}
        </ul>
      )}
    </div>
  )

}

export default RickAndMortyCharacters;