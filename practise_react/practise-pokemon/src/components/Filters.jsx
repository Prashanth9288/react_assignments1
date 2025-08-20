import { useDispatch, useSelector } from "react-redux";
import { setFilterType, setSortOrder } from "../features/pokemon/pokemonSlice";

export default function Filters() {
  const dispatch = useDispatch();
  const { filterType, sortOrder } = useSelector((state) => state.pokemon);

  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <label>
        Filter by Type:
        <select
          value={filterType}
          onChange={(e) => dispatch(setFilterType(e.target.value))}
          style={{ marginLeft: "10px" }}
        >
          <option value="all">All</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="bug">Bug</option>
          <option value="normal">Normal</option>
          <option value="poison">Poison</option>
        </select>
      </label>
      <label style={{ marginLeft: "20px" }}>
        Sort by Name:
        <select
          value={sortOrder}
          onChange={(e) => dispatch(setSortOrder(e.target.value))}
          style={{ marginLeft: "10px" }}
        >
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </select>
      </label>
    </div>
  );
}
