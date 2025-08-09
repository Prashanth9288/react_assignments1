import React, { useReducer, useState } from "react";

const initialState={email:'',password:''};

function reducer(state,action){
  switch(action.type){
    case 'email':
      return {...state,email:action.payload};
    case 'password':
      return{...state,password:action.payload};

    case 'reset':
      return initialState;
    default:
      return state;
  }
}

export default function FormUseReducer(){
  const[state,dispatch]=useReducer(reducer,initialState);

  const[submittedData,setSubmittedData]=useState(null);

  const handleSubmit=(e)=>{
    e.preventDefault();
    setSubmittedData(state);
  }

  const handleReset=()=>{
    dispatch({type:'reset'});
    setSubmittedData(null)
  };

  return(
    <div>
      <h1>Final Form</h1>

      <form onSubmit={handleSubmit}>
        <input type="email" value={state.email} onChange={(e)=>dispatch({type:'email',payload:e.target.value })} placeholder="Enter the Email"/>

        <input type="password" value={state.password} onChange={(e)=>dispatch({type:'password',payload:e.target.value})}  placeholder="Enter the Password"/>

        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
      {submittedData ? (
        <div>
          <p>Submitted Email:{submittedData.email}</p>
          <p>Submitted Password:{submittedData.password}</p>
          </div>
      ):(
        <p>No detail found</p>
      )}
    </div>
  )
}