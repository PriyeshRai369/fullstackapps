import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import ContextProvider from './context/Context.jsx'
import Registration from './components/Registration/Registration.jsx'
import Home from './components/Home/Home.jsx'
import Login from './components/Login/Login.jsx'
import Profile from './components/Profile/Profile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='user/register' element={<Registration/>} />
      <Route path='user/login' element={<Login/>} />
      <Route path='user/profile' element={<Profile/>} />
    </Route>
  )
)




ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <RouterProvider router={router}  />
  </ContextProvider>
 
)
