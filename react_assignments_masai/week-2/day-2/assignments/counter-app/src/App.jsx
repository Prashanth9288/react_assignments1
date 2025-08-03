import React from "react";

import Counter from "./components/counter";


function App(){
  return(
    <div>
      <h1>React App</h1>
  <Counter initialValue={2}/>
    </div>
  )
}
export default App;