import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function RecipeDetail() {
  const { id } = useParams();  
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.error("Error fetching recipe details:", error);
      });
  }, [id]);

  if (!recipe) {
    return <p>Loading recipe details...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{recipe.name}</h2>
      <img
        src={recipe.image}
        alt={recipe.name}
        style={{ width: "300px", borderRadius: "10px" }}
      />
      <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
      <p><strong>Calories per Serving:</strong> {recipe.caloriesPerServing}</p>
      <h3>Instructions:</h3>
      <ol style={{listStyleType:"none",}}>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetail;
