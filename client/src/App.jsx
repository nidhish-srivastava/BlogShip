import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Get from './components/GetAll'
import Create from './components/Create'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import MyPosts from './components/MyPosts'
import Profile from './components/Profile'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/profile' element = {<Profile/>} />
      <Route path='/' element = {<Dashboard/>} />
      <Route path='/my-blogs/:id' element = {<MyPosts/>} />
      <Route path='/all-posts' element = {<Get/> } />
     <Route path='/create' element = {<Create/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/register' element = {<Register/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App