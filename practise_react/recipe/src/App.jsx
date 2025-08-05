import React, { Children } from 'react'
import FetchData from './Components/fetch'
import axios  from 'axios'
import { Route } from 'react-router-dom'
import Unknown from './Components/Unknown'
import RecipeCard from './Components/RecipeCard'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<FetchData/>}/>
      <Route path='/RecipeCard/:id' element={<RecipeCard/>}/>
      <Route path='*' element={<Unknown/>}/>
    </Routes>
    </>
  )
}

export default App
