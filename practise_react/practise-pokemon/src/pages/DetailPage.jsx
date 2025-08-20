import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import ErrorBanner from "../components/ErrorBanner";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(res.data);
      } catch {
        setError("Failed to load Pokémon details");
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorBanner message={error} />;
  if (!pokemon) return <p>No Pokémon found.</p>;

  const borderColor = pokemon.types.some((t) => t.type.name === "fire")
    ? "red"
    : pokemon.types.some((t) => t.type.name === "water")
    ? "blue"
    : "gray";

  const bgColor = pokemon.base_experience > 100 ? "lightgreen" : "white";

  return (
    <div
      style={{
        border: `3px solid ${borderColor}`,
        background: bgColor,
        padding: "20px",
        margin: "20px",
        borderRadius: "12px",
      }}
    >
      <h1>
        {pokemon.name} {pokemon.base_experience > 100 && "⚡"}
      </h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} width="150" />
      <p><b>Height:</b> {pokemon.height}</p>
      <p><b>Weight:</b> {pokemon.weight}</p>
      <p><b>Types:</b> {pokemon.types.map((t) => t.type.name).join(", ")}</p>
      <p><b>Abilities:</b> {pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>
      <p><b>Moves:</b> {pokemon.moves.slice(0, 5).map((m) => m.move.name).join(", ")} ...</p>
      <div>
        <b>Sprites:</b><br />
        {pokemon.sprites.front_default && <img src={pokemon.sprites.front_default} alt="front" />}
        {pokemon.sprites.back_default && <img src={pokemon.sprites.back_default} alt="back" />}
        {pokemon.sprites.front_shiny && <img src={pokemon.sprites.front_shiny} alt="shiny" />}
      </div>
      <br />
      <button onClick={() => navigate("/")}>⬅ Back to Dashboard</button>
    </div>
  );
}
