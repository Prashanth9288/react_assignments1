import React from "react";
import ToggleButton from "./components/Toggle-button";

function App(){
  return(
    <div>
      <h1>React App</h1>
      <ToggleButton label="Power:"/>
      <ToggleButton label="wi-Fi"/>
      <ToggleButton/>
    </div>

  )
}

export default App;