// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import Welcome from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Welcome />
//   </StrictMode>,
// )


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PageTitle from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageTitle />
  </StrictMode>,
)

