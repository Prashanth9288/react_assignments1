//Example: Run on Mount (Like componentDidMount)

// import { useEffect } from 'react'
// import './App.css'

// function Welcome() {
//   useEffect(()=>{
//     console.log("component mounted.")
//   },[]); // empty array means run only once.
//   return <h2>Hello , useEffect</h2>
// }
// export default Welcome


import React,{useState,useEffect} from "react";

import './App.css';

function PageTitle(){
  const [count,setCount]=useState(0);

  useEffect(()=>{
    document.title=`Clicked ${count} times`;
  },[count]);

  return (
    <div>
      <p>You Clicked {count} times</p>
      <button onClick={()=> setCount(count+1)}>Click</button>
    </div>
  )
}
export default PageTitle