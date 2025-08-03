import React,{useState} from "react";

function Counter(props){
const [count,setCount]=useState(props.initialValue);
function handleIncrement(){
  setCount(count+1);
}
function handleDecrement(){
  if(count>0){
    setCount(count-1)
  }
}

function handleReset(){
  setCount(props.initialValue);
}
  return(
    <div style={{textAlign:'center',marginTop:"20px"}}>
      <h2>Counter Component</h2>
      <p>Count:{count}</p>
      <button onClick={handleIncrement} >Increment</button>
      <button onClick={handleDecrement} disabled={count===0} >Decrement</button>

      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Counter;