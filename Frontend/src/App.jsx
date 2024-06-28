import { useState } from 'react'
import Home from './components/drive/Home'
import Signup from './components/drive/Signup'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='signup' element={<Signup/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
