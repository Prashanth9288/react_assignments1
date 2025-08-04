
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import RecipeDetail from "./pages/RecipeDetail.jsx";
function App(){
  return(
    <div style={{padding:"20px", textAlign:"center"}}>
      <h1>Recipe Finder App</h1>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/recipe/:id"  element={<RecipeDetail/>}/>
      </Routes>
    </div>
  )
}
export default App;