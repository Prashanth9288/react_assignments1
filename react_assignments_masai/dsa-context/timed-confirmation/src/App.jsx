import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom";

function App() {
  
  const [showConfirmation,setShowConfirmation]=useState(false);

  const[timer,setTimer]=useState(10)
  const navigate=useNavigate();

  useEffect(()=>{
    let countdown;
    if(showConfirmation && timer>0){
      countdown=setInterval(()=>{
        setTimer((prev)=>prev-1);
      },1000);
    }

    if(timer===0){
      setShowConfirmation(false);
      setTimer(10);
    }

    return ()=> clearInterval(countdown);
  },[showConfirmation,timer])

  const handleFetchClick=()=>{
    setShowConfirmation(true);
    setTimer(10);
  };

  const handleNoclick=()=>{
    setShowConfirmation(false);
    setTimer(10);
  }

  const handleYesClick=()=>{
    navigate("/data");
  }

  return (
   <div style={styles.container}>
    {!showConfirmation ? (
      <button style={styles.button} onClick={handleFetchClick}>
        Fetch Data
      </button>
    ):(
      <div style={styles.box}>
        <p style={{fontSize:"18px",marginBottom:"18px"}}>
          Are you sure want to fetch data?
        </p>
        <p style={{
          fontSize:"24px",
          fontWeight:"bold",
          color: timer > 5 ? "green" : "red",
          marginBottom:"15px",
        }}
        >
          {timer}
          </p>
        <div>
          <button style={styles.yesBtn} onClick={handleYesClick}>Yes</button>
          <button style={styles.noBtn} onClick={handleNoclick}>No</button>
        </div>
      </div>
    )}
   </div>
  );
}

const styles={
  container:{
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#badeecff"
  },
  button:{
    padding:"12px 24px",
    fontSize:"18px",
    fontWeight:"bold",
    cursor:"pointer",
    backgroundColor:"#53ea12ff",
    color:"#fff",
    border:"none",
    borderRadius:"5px",
    alignItems:"center"
  },
  yesBtn:{
    padding:"10px 20px",
    backgroundColor:"green",
    color:"white",
    mrginRight:"10px",
    border:"none",
    borderRadius:"5px",
    cursor:"pointer",
    fontWeight:"bold"
  },
  noBtn:{
    padding:"10px 20px",
    backgroundColor:"red",
    color:"white",
    border:"none",
    borderRadius:"5px",
    cursor:"pointer",
    fontWeight:"bold",
    marginLeft:"10px"
  },
  box:{
    backgroundColor:"#fff",
    padding:"20px",
    borderRadius:"8px",
    textAlign:"center",
    boxShadow:"0 2px 6px rgba(0,0,0,0.2)",
  }
};

export default App
