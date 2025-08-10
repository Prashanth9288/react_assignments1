import React, { useReducer } from "react";

const initialState = { theme: "light" };

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light"
      };
    default:
      return state;
  }
}

export default function ThemeToggleApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const appStyles = {
    backgroundColor: state.theme === "light" ? "#ffffff" : "#222222",
    color: state.theme === "light" ? "#000000" : "#ffffff",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    <div style={appStyles}>
      <h1>Current Theme: {state.theme}</h1>
      <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
        Toggle Theme
      </button>
    </div>
  );
}
