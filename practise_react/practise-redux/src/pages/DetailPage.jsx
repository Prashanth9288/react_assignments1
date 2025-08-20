// src/pages/DetailPage.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonById, clearSelectedPokemon } from '../features/pokemon/pokemonSlice';
import Loader from '../components/Loader';
import ErrorBanner from '../components/ErrorBanner';

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selected = useSelector(s => s.pokemon.selectedPokemon);

  useEffect(() => {
    // fetch pokemon details when page mounts
    dispatch(fetchPokemonById(id));

    // clear selected on unmount to avoid stale data
    return () => dispatch(clearSelectedPokemon());
  }, [dispatch, id]);

  if (selected.status === 'loading') return <Loader />;
  if (selected.status === 'failed') return <ErrorBanner message={selected.error} />;

  const p = selected.data;
  if (!p) return null;

  const isFire = p.types.some(t => t.type.name === 'fire');
  const isWater = p.types.some(t => t.type.name === 'water');
  const highScore = (p.base_experience || 0) > 100;
  const borderColor = isFire ? 'red' : isWater ? 'blue' : '#ddd';
  const bg = highScore ? '#eaffea' : '#fff';

  // gather sprite urls (some null) from sprites object
  const sprites = Object.values(p.sprites || {}).filter(v => typeof v === 'string' && v);

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => navigate('/')}>Back to Dashboard</button>

      <div style={{
        border: `2px solid ${borderColor}`,
        borderRadius: 8,
        padding: 12,
        background: bg,
        marginTop: 12
      }}>
        <h2>
          {p.name} {highScore && <span title="High base experience">⚡</span>}
        </h2>

        <div>Height: {p.height}</div>
        <div>Weight: {p.weight}</div>
        <div>Base Experience: {p.base_experience}</div>

        <div style={{ marginTop: 12 }}>
          <strong>Abilities</strong>
          <ul>
            {p.abilities.map(a => <li key={a.ability.name}>{a.ability.name}</li>)}
          </ul>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Moves (first 10)</strong>
          <ul>
            {p.moves.slice(0, 10).map(m => <li key={m.move.name}>{m.move.name}</li>)}
          </ul>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Sprites</strong>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            {sprites.map((s, idx) => (
              <img key={idx} src={s} alt={`${p.name} sprite ${idx}`} width={96} height={96} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
