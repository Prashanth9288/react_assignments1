import { useEffect,useState } from "react";

import axios from "axios";

import RecipeCard from "../components/RecipeCard";
function Home(){
  const[recipes,setRecipes]=useState([]);

  const[favorites,setFavorites]=useState([]);

  useEffect(()=>{
    axios.get(`https://dummyjson.com/recipes`)
    .then(response=>{
      setRecipes(response.data.recipes);
    })
    .catch(error=>{
      console.error("Error fetching recipes:",error)
    });
  },[])

  const toggleFavorite=(id)=>{
    setFavorites((prevFavorites)=>
      prevFavorites.includes(id) ? prevFavorites.filter((favId)=>favId !==id) : [...prevFavorites,id])
  }
  return(
  <div>
    <h2>Recipes</h2>
    <div style={{
      display:"grid",
      gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",
      gap:"15px",
      marginTop:"20px"
    }}>
      {recipes.map((recipe)=>(
        <RecipeCard key={recipe.id} recipe={recipe}
        isFavorite={favorites.includes(recipe.id)}
        onToggleFavorite={toggleFavorite}/>
      ))}
    </div>
  </div>
)
}
export default Home;