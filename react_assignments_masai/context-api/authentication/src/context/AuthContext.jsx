import React, { createContext, useState } from "react";

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
  const[isAuthenticated,setIsAuthenticated]=useState(false);

  const ToggleAuth=()=>{
    setIsAuthenticated(prev=>!prev);
  }

  return(
    <AuthContext.Provider value={{isAuthenticated,ToggleAuth}}>{children}</AuthContext.Provider>
  )
}