// src/components/Pagination.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../features/pokemon/pokemonSlice';

// Pagination UI: Previous / Next and current page display
export default function Pagination() {
  const dispatch = useDispatch();
  const page = useSelector(s => s.pokemon.page);
  const limit = useSelector(s => s.pokemon.limit);
  const count = useSelector(s => s.pokemon.count);

  const totalPages = Math.max(1, Math.ceil(count / limit));

  const handlePrev = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };
  const handleNext = () => {
    if (page < totalPages) dispatch(setPage(page + 1));
  };

  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 16 }}>
      <button onClick={handlePrev} disabled={page === 1}>Previous</button>
      <div>Page {page} / {totalPages}</div>
      <button onClick={handleNext} disabled={page === totalPages}>Next</button>
    </div>
  );
}
