import React from "react";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";


const App=()=>{
  return(
    <div style={{fontFamily: 'Arial', textAlign: 'center', marginTop: '50px'}}>
      <Navbar/>
      <Main/>
      <Footer/>

    </div>
  )
}

export default App;