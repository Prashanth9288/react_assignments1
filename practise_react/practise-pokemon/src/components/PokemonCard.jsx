import { useNavigate } from "react-router-dom";

export default function PokemonCard({ pokemon }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/details/${pokemon.id}`)}
      style={{
        border: "1px solid gray",
        borderRadius: "8px",
        margin: "10px",
        padding: "10px",
        cursor: "pointer",
        width: "150px",
        textAlign: "center",
      }}
    >
      <img src={pokemon.sprites.front_default} alt={pokemon.name} width="100" />
      <h3>{pokemon.name}</h3>
      <p>XP: {pokemon.base_experience}</p>
      <p>Weight: {pokemon.weight}</p>
    </div>
  );
}
