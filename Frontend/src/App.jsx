import { useState } from 'react'
import Home from './components/drive/Home'
import Signup from './components/drive/Signup'
import { UserContextProvider } from './context/AuthContest.jsx'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import PrivateRoute from './components/drive/PrivateRoute.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <UserContextProvider>
      <Router>
      <Routes>
        <Route exact path='/' element={PrivateRoute} />
        <Route path='signup' element={<Signup/>}/>
      </Routes>
    </Router>
    </UserContextProvider>
    
    </>
  )
}

export default App
