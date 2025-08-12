import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './redux/counterSlice';

function App() {
  const dispatch = useDispatch();
  const counterValue = useSelector((state) => state.counter.value);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Redux Counter</h2>
      <p>Value: {counterValue}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <h3>State (stringified)</h3>
      <pre>{JSON.stringify({ value: counterValue }, null, 2)}</pre>
    </div>
  );
}

export default App;
