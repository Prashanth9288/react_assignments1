import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = ()=>{

  const{isAuthenticated,toggleAuth}=useContext(AuthContext);
return(
  <nav style={{background:"#ccc", padding:"1rem"}}>
    <button onClick={toggleAuth}>{isAuthenticated? 'Logout' :'Login'}</button>
  </nav>
);
};

export default Navbar;