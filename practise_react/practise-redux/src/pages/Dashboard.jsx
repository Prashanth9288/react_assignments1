// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from '../features/pokemon/pokemonSlice';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import ErrorBanner from '../components/ErrorBanner';
import { Link } from 'react-router-dom';

// Dashboard page: fetches and displays the list of pokemons
export default function Dashboard() {
  const dispatch = useDispatch();
  const { items, status, error, page, limit } = useSelector((s) => s.pokemon);

  // Fetch pokemons whenever page/limit/filter/sort changes (slice uses getState)
  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch, page, limit, /* the slice reads filter & sort from state, so no need to list them here */]);

  return (
    <div style={{ padding: 20 }}>
      <h1>PokeDex Pro</h1>

      <Filters />

      {status === 'loading' && <Loader />}
      {status === 'failed' && <ErrorBanner message={error} />}

      {status !== 'loading' && items.length === 0 && (
        <div>No Pokémon match your search.</div>
      )}

      {/* Grid of Pokemon cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 12,
        marginTop: 16
      }}>
        {items.map((p) => {
          // Determine visual flags
          const isFire = p.types.some(t => t.type.name === 'fire');
          const isWater = p.types.some(t => t.type.name === 'water');
          const highScore = (p.base_experience || 0) > 100;
          const borderColor = isFire ? 'red' : (isWater ? 'blue' : '#ddd');
          const bg = highScore ? '#eaffea' : '#fff';

          return (
            <Link key={p.id} to={`/details/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                border: `2px solid ${borderColor}`,
                borderRadius: 8,
                padding: 12,
                background: bg,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img src={p.sprites?.front_default} alt={p.name} width={96} height={96} />
                </div>

                <div style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {p.name} {highScore && <span title="High base experience">⚡</span>}
                </div>

                <div>Base Exp: {p.base_experience}</div>
                <div>Weight: {p.weight}</div>
                <div>
                  Types: {p.types.map(t => (
                    <span key={t.slot} style={{ marginRight: 6 }}>{t.type.name}</span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <Pagination />
    </div>
  );
}
