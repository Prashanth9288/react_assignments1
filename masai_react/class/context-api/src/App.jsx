import{useState} from "react";
import "./App.css";

function App(){
  const[user,setUser]=useState("John");

  return <Parent user={user}/>
}
function Parent({user}){
  return <Child user={user}/>
}
function Child({user}){
  return <GrandChild user={user}/>
}
function GrandChild({user}){
  return <h1>Hello,{user}</h1>
}
export default App;
