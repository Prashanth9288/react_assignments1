import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function RecipeDetailPage(){
  const {id}=useParams();
  const [recipe,setRecipe]=useState(null);

  useEffect(()=>{
    axios.get(`https://dummyjson.com/recipes/${id}`)
    .then(response=>{
      setRecipe(response.data)
    })
    .catch(error=> console.error("Error Fetching recipe details",error));
  },[id]);

  if(!recipe){
  return <p>Loading recipe details.....</p>
  }
  return(
    <div>
      <Link to="/"  ><button style={{border:0, fontWeight:"bold", cursor:"pointer",padding:"10px", borderRadius:"4px",backgroundColor:"#60dcceff",color:"white",}}>  Back to Home</button></Link>
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name}  style={{width:"200px",borderRadius:"6px"}}/>
      <p><strong>Cuisine:</strong>{recipe.cuisine}</p>
      <p><strong>Difficulty:</strong>{recipe.difficulty}</p>
      <p><strong>Ingredients:</strong>
      <ul>
        {recipe.ingredients.map((item,index)=>(
          <li key={index}>{item}</li>
        ))}
        </ul></p>
        <p><strong>Instructions:</strong>{recipe.instructions}</p>
    </div>
  )
}
export default RecipeDetailPage;