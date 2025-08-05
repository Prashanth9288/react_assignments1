import React,{useContext} from "react";
import { ThemeContext } from "../context/ThemeContext";

const Header=()=>{
  const {theme}=useContext(ThemeContext);

  const headerStyle={
    backgroundColor:theme==='light' ? '#eee':'#555',
    padding:'1rem',
    marginTop:'1rem',
  };
  return <div style={headerStyle}>This is the Header Component</div>;
}

export default Header;