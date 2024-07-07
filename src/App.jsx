import React from 'react'
import NavBar from './components/Header/NavBar'
import './App.css'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App