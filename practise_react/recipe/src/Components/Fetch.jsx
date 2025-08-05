
import axios from "axios";

import React, { useEffect, useState } from "react";


function FetchData(){
const[recipes,setRecipes]=useState([]);
useEffect(()=>{
  async function fetchData() {
    
    try{
      const response = await axios.get("https://dummyjson.com/recipes");
        setRecipes(response.data.recipes); 
        // console.log(response);
    }
    catch(error){
      console.error(error)
    }
  }
  fetchData()
},[])


return(
  <>
  <h2>Recipes</h2>
  {recipes.length===0 ?(
    <p>Loading...</p>
  ):(
    
    recipes.map((r)=>(
      <div key={r.id}>
        <img src={r.image} alt={r.name} width={200}/>
        <h3>{r.name}</h3>
        <h4>{r.cuisine}</h4>
        <h5>{r.title}</h5>
        <button onClick={()=>
          setshowFavs(!showFavs)
        }>{showFavs ? '❤️' : '🩶'}</button>
        <Link to={`/RecipeCard/${recipes.id}`}>View Recipe</Link>
      </div>
    ))
  )}
  </>
);
}

export default FetchData;
