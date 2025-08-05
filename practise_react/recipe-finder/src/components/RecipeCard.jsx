import { Link } from "react-router-dom";

function RecipeCard({recipe,isFavorite,onToggleFavorite}){
  return(
    <div style={{
      border:"1px solid black",
      borderRadius:"8px",
      padding:"10px",
      background:"#fff",
      position:"relative"
    }}>

      <Link to={`/recipe/${recipe.id}`} style={{textDecoration:"none" ,color:"black"}}>
      <img 
      src={recipe.image} 
      alt={recipe.name} 
      style={{width:"100%",borderRadius:"8px"}}/>

      <h3>{recipe.name}</h3>
      <p><strong>Cuisine:</strong>{recipe.cuisine}</p>
    </Link>
      <button onClick={()=> onToggleFavorite(recipe.id)}
        style={{border:0,cursor:"pointer", position:"relative",background:"None"}}>
        {isFavorite ? "🩶Remove Favorites" :"❤️Add to  Favorite"}
      </button>
    </div>
  )
}

export default RecipeCard;
