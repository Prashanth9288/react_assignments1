import React from "react";
import { useState } from "react";
export default function NameForm(){
  const[name,setName]=useState(null);
  const[age,setAge]=useState(null)
  const[submit,setSubmit]=useState(null)
  return(
    <div>
      <label >Name:
        <input type="text" placeholder="Enter Your Name:" value={name} onChange={(e)=>setName(e.target.value)} />
      </label>
      <label >Age:
        <input type="number" placeholder="Enter Your Age " value={age} onChange={(e)=>setAge(e.target.value)}/>
      </label>
      <button onClick={()=>setSubmit(submit)}>submit</button>
      <p>Name:{name}</p>
      <p>Age:{age}</p>
    </div>
  )
}