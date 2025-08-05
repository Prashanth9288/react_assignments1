import axios from "axios";
import { useEffect, useState } from "react";

import RecipeCard from "./RecipeCard";
 export default function Home(){
  const [recipes,setRecipes]=useState([])
  const [showFavs,setShowFavs]=useState(false)

  useEffect(()=>{
    axios.get("https://dummyjson.com/recipes")
    .then(response=>setRecipes(response.data.recipes))
    .catch(error=>console.error(error))
  },[])

  const filteredRecipes=showFavs ? recipes.filter(r=>(JSON.parse(localStorage.getItem('favorites'))||[]).includes(r.id)): recipes

  return(
    
    <div>
      
     <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>

      <button onClick={()=> setShowFavs(!showFavs)}>
        {showFavs ? "show all Recipes":"show Favourites"}
      </button>
    </div>
  )
}