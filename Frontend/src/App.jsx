import { useState } from 'react'
import Home from './components/drive/Home'
import Signup from './components/drive/Signup'
import { UserContextProvider } from './context/AuthContest.jsx'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import {PrivateRoute, PublicRoute} from './components/drive/PrivateRoute.jsx'
import Login from './components/drive/Login.jsx'
function App() {
  

  return (
    <>
    <UserContextProvider>
      <Router>
      <Routes>
        <Route exact path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path='/signup' element={<PublicRoute><Signup/></PublicRoute>}/>
      </Routes>
    </Router>
    </UserContextProvider>
    
    </>
  )
}

export default App
