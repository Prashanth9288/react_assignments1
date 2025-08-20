import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../features/pokemon/pokemonSlice";

export default function Pagination() {
  const dispatch = useDispatch();
  const { offset } = useSelector((state) => state.pokemon);

  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <button
        disabled={offset === 0}
        onClick={() => dispatch(fetchPokemons(offset - 20))}
      >
        Previous
      </button>
      <span style={{ margin: "0 10px" }}>Page {offset / 20 + 1}</span>
      <button onClick={() => dispatch(fetchPokemons(offset + 20))}>
        Next
      </button>
    </div>
  );
}
