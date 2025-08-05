import { useEffect,useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
function HomePage(){

  const [recipes,setRecipes]=useState([]);
  const [favorites,setFavorites]=useState([]);

  useEffect(()=>{
    axios.get("http://dummyjson.com/recipes")
    .then(response=>{
      setRecipes(response.data.recipes);

    })
    .catch(error=>console.error("Error fetching recipes: ",error));
  },[]);

  const handleToggleFavorite=(id)=>{
    if(favorites.includes(id)){
      setFavorites(favorites.filter(favId=>favId!==id));
    }else{
      setFavorites([...favorites,id]);
    }
  }

  return (
    <div style={{padding:"20px"}}>
      <h1>Recipe Finder</h1>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"20px"}}>
        {recipes.map(recipe=>(
          <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
          isFavorite={favorites.includes(recipe.id)}
          onToggleFavorite={handleToggleFavorite}/>
        ))
      }
      </div>
    </div>
  );
}
export default HomePage;