import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name,setName]=useState("Tommy")
  console.log("rendered")

  useEffect(()=>{
  console.log("Fetch operation trigred")
  },[])
  return (
   <>
   <h1>Count:{count}</h1>
   <h1>Name:{name}</h1>
   <button onClick={()=> setCount(count+1)}>Increment</button>
   <button onClick={()=>setCount(count-1)}>Decrement</button>
   <button onClick={()=>setName("Moti")}>Change Name</button>
   </>
  )
}

export default App
