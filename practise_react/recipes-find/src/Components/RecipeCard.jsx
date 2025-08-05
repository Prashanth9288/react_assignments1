import { useEffect, useState } from "react";

export default function RecipeCard({recipe}){
  const[fav,setFav]=useState(false)

  useEffect(()=>{
    const storedFavs=JSON.parse(localStorage.getItem('favorites')) || [] 
    setFav(storedFavs.includes(recipe.id))
  },[recipe.id])
}