import { useReducer } from "react";
import React from "react";

const initialState={count:0};

function reducer(state,action){
switch(action.type){
  case 'INCREMENT':
    return {count:state.count+5};
  case 'DECREMENT':
    return {count:state.count>0 ? state.count-5:state.count};
  case 'RESET':
    return initialState;
  default:
    throw new Error('Invalid action type')
}
}


export default function Counter(){
  const[state,dispatch]=useReducer(reducer,initialState);

  return(
    <div>
      <h2>Count:{state.count}</h2>

      <button onClick={()=>dispatch({type:'INCREMENT'})}>INCREMENT</button>
      <button onClick={()=>dispatch({type:'DECREMENT'})}>DECREMENT</button>
      <button onClick={()=>dispatch({type:"RESET"})}>RESET</button>

    </div>
  )
}