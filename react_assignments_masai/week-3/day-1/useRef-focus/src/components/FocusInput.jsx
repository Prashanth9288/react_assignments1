import React from "react";
import { useState } from "react";
import { useRef } from "react";
export default  function FocusInput(){
  const inputRef=useRef(null);

  const [focused,setFocused]=useState(false);

  const handleFocus=()=>{
    inputRef.current.focus();
    inputRef.current.style.backgroundColor="#840c0cff",
    
    setFocused(true);
  };

  return(
    <div>
      <input type="text"  ref={inputRef} placeholder="Click the button to focus " style={{color:"#f77777",borderColor:"red", borderStyle:"none"}}/><br/><br/>

      <button onClick={handleFocus} 
      style={{cursor:"pointer"}}>Focus Input</button>
      <br/><br/>

      {focused && <p>Focused!</p>}
    </div>
  )
}