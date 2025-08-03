import React,{useState} from "react";

function ToggleButton(props){

  const[isOn,setIsOn]=useState(false)

  function handleToggle(){
    setIsOn(!isOn);
  }
  return(
    <div style={{textAlign:"center",marginTop:"20px"}}>
      <h2>Toggle Button Component</h2>
      {props.label && }
      <button onClick={handleToggle}
      style={{
        color:isOn ? "green" : "red",
        fontWeight:"bold",
        padding:"10px 20px",
        cursor:"pointer",
        border:"1px solid #ccc",
        borderRadius:"5px",
      }} >{isOn ? "ON":"OFF"}</button>
    </div>
  )
}
export default ToggleButton;