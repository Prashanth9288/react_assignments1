import { useNavigate } from "react-router-dom";

function RecipeCard({recipe,isFavorite,onToggleFavorite}){
  const navigate=useNavigate();

  return(
    <div style={{
            border:"1px solid #ccc",
            padding:"10px",
            borderRadius:"8px",
            textAlign:"center",
            background:"#f9f9f9",
            position:"relative"
    }}>
      
      <button onClick={(e)=>{
        e.stopPropagation();
        onToggleFavorite(recipe.id);
      }} style={{
        position:"absolute",
        top:"10px",
        right:"10px",
        background:"none",
        border:"none",
        fontSize:'20px',
        cursor:"pointer"
      }}>
        {isFavorite ? "❤️" : "🩶"}
      </button>
      <div onClick={()=>navigate(`/recipe/${recipe.id}`)} style={{cursor:"pointer"}}>
        <img src={recipe.image} alt={recipe.name} 
        style={{width:"100%",height:"150px",objectFit:"cover",borderRadius:"5px"}}/>
        <h3>{recipe.name}</h3>
        <p><strong>Cuisine:</strong>{recipe.cuisine}</p>
      </div>
    </div>
  )
}

export default RecipeCard;