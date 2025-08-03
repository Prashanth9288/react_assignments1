//import { useState } from 'react'
import './App.css'
import Child from './Child'
import { Footer } from './components/Footer'
import Header from './components/Header'
import MainContent from './components/MainConentent'
import Middle from './components/Middle'
function App() {
  
  return (
   <>
      <Header/>
      <MainContent/>
     <Footer/>
     <Middle/>
     <Child/>
   </> 
  )
}

export default App
