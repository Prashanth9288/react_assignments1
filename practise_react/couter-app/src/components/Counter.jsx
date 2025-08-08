import { useReducer } from "react"

let initState={
  count:0,
  toggle:true
}


function CounterReducerFn(state,action){

  switch(action.type){
    case "Increase":
      return {...state, count: state.count+1, toggle: !(state.toggle)}

    case "Decrease":
      return {...state, count:state.count>0 ? state.count -1:0,toggle: !(state.toggle)}

    case "Reset":
      return{...state,count:0, toggle: !(state.toggle)}

    default:
      return state
  }
}

const Counter=()=>{

  const [state,dispatch]=useReducer(CounterReducerFn,initState);
  console.log(state);

  return(
    <>
      <div style={{
        textAlign:'center',
        marginTop:'150px',
        marginBottom:"150px"
      }}>
        <button onClick={()=>dispatch({type:"Increase"})}
      style={{alignItems:"center", backgroundColor:"#77c1ceff",
    color:"white",
    fontWeight:'bold',
    border:"solid 2px #597aabff",
    borderRadius:"6px",
    padding:"10px",
    fontSize:"24px",
    marginLeft:'5px',
    cursor:"pointer"
    }}>Increase</button>

      <div style={{
        fontSize:"30px",
        fontWeight:"bold",
        padding:"5px",
        marginLeft:"15px",
        alignItems:'center',
        textAlign:"center"

      }}>Count:</div>{state.count}

    <button onClick={()=>dispatch({type:"Decrease"})}
    disabled={state.count===0}
     style={{alignItems:"center", backgroundColor:"#ce9677ff",
    color:"white",
    fontWeight:'bold',
    border:"solid #41092bff",
    borderRadius:"6px",
    padding:"10px",
    fontSize:"24px",
    marginLeft:'5px',
    cursor:"pointer",
    
    }}>Decrease</button>
      <button onClick={()=>dispatch({type:"Reset"})}
        style={{alignItems:"center", backgroundColor:"#e00c5dff",
    color:"white",
    fontWeight:'bold',
    border:"solid #ac0b6cff",
    borderRadius:"6px",
    padding:"10px",
    fontSize:"24px",
    marginLeft:'5px',
    cursor:"pointer",
    
    }}>Reset</button>
      </div>
    </>
  )
}

export default Counter;