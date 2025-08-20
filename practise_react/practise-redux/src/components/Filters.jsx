// src/components/Filters.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterType, setSortOrder } from '../features/pokemon/pokemonSlice';

// Filters component: type dropdown and sort control
export default function Filters() {
  const dispatch = useDispatch();
  const filterType = useSelector((s) => s.pokemon.filterType);
  const sortOrder = useSelector((s) => s.pokemon.sortOrder);
  const [types, setTypes] = useState([]);

  // fetch available types once on mount
  useEffect(() => {
    let mounted = true;
    fetch('https://pokeapi.co/api/v2/type')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        // data.results is an array of type {name, url}
        setTypes(data.results.map(t => t.name));
      })
      .catch((err) => {
        // silently ignore; component will still show 'all'
        console.error('Failed to load types', err);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
      <label>
        Type:
        <select
          value={filterType}
          onChange={(e) => dispatch(setFilterType(e.target.value))}
          style={{ marginLeft: 8 }}
        >
          <option value="all">All</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </label>

      <label>
        Sort:
        <select
          value={sortOrder}
          onChange={(e) => dispatch(setSortOrder(e.target.value))}
          style={{ marginLeft: 8 }}
        >
          <option value="az">Name A → Z</option>
          <option value="za">Name Z → A</option>
        </select>
      </label>
    </div>
  );
}
