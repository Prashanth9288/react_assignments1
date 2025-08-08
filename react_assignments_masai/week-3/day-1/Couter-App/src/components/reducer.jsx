import React from "react";
import { useReducer } from "react";

  function reducer(state,action){
  switch(action.type){
    case "increment":
      return state +1
    case "decrement":
      return state-1
    default:
      return state
  }
}
  export default function Counter(){
    const [count,dispatch]=useReducer(reducer,0)
    function increment(){
      dispatch({type:"increment"})
    }
    function decrement(){
      dispatch({type:"decrement"})
    }
    return (
      <div>
        <div>Count:{count}</div>
        <button onClick={increment}>Increment Count</button>
        <button onClick={decrement}>Decrement Count</button>
      </div>
    )
   
  }
