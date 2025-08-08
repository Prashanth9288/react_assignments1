import React, { useReducer } from 'react';

// Initial state
const initialState = {
  theme: 'light', // Can be 'light' or 'dark'
};

// Reducer function
function themeReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'SET_LIGHT':
      return {
        ...state,
        theme: 'light',
      };
    case 'SET_DARK':
      return {
        ...state,
        theme: 'dark',
      };
    default:
      return state;
  }
}

// Main component
export default function ThemeToggleApp() {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Styles change based on the theme
  const appStyles = {
    backgroundColor: state.theme === 'light' ? '#ffffff' : '#222222',
    color: state.theme === 'light' ? '#000000' : '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '1rem',
  };

  return (
    <div style={appStyles}>
      <h1>Current Theme: {state.theme.toUpperCase()}</h1>

      {/* Toggle Theme Button */}
      <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })} 
        style={{ 
            marginLeft: "10px",
            //backgroundColor: "#cccccc",
            border: "1px solid #999",
            padding: "10px",
            fontSize: "24px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",}}>
        Toggle Theme
      </button>

      {/* Set Light Theme Button */}
      <button onClick={() => dispatch({ type: 'SET_LIGHT' })} 
        style={{ 
            marginLeft: "10px",
            //backgroundColor: "#cccccc",
            border: "1px solid #999",
            padding: "10px",
            fontSize: "24px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",}}>
        Set Light Theme
      </button>

      {/* Set Dark Theme Button */}
      <button onClick={() => dispatch({ type: 'SET_DARK' })}
        style={{ 
            marginLeft: "10px",
            //backgroundColor: "#cccccc",
            border: "1px solid #999",
            padding: "10px",
            fontSize: "24px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",}}>
        Set Dark Theme
      </button>
    </div>
  );
}
