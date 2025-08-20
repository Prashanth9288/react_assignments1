import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../features/pokemon/pokemonSlice";
import Loader from "../components/Loader";
import ErrorBanner from "../components/ErrorBanner";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { list, loading, error, offset, filterType, sortOrder } = useSelector(
    (state) => state.pokemon
  );

  useEffect(() => {
    dispatch(fetchPokemons(offset));
  }, [dispatch, offset]);

  if (loading) return <Loader />;
  if (error) return <ErrorBanner message={error} />;

  let filteredList = list;
  if (filterType !== "all") {
    filteredList = filteredList.filter((poke) =>
      poke.types.some((t) => t.type.name === filterType)
    );
  }

  filteredList = [...filteredList].sort((a, b) => {
    if (sortOrder === "asc") return a.name.localeCompare(b.name);
    else return b.name.localeCompare(a.name);
  });

  return (
    <div>
      <h1>Pokédex Dashboard</h1>
      <Filters />
      <Pagination />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredList.length > 0 ? (
          filteredList.map((poke) => (
            <PokemonCard key={poke.id} pokemon={poke} />
          ))
        ) : (
          <p>No Pokémon match your search.</p>
        )}
      </div>
      <Pagination />
    </div>
  );
}
