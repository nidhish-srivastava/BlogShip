import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Get from './components/Get'
import Create from './components/Create'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import MyPosts from './components/MyPosts'
import { useBlogContext } from './context/context'
import GetSinglePost from './components/GetSinglePost'
import Profile from './components/Profile'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/profile' element = {<Profile/>} />
      <Route path='/' element = {<Dashboard/>} />
      <Route path='/:id2' element = {<GetSinglePost/>} />
      <Route path='/my-blogs/:id' element = {<MyPosts/>} />
      <Route path='/:id/:id' element = {<Get/> } />
     <Route path='/create' element = {<Create/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/register' element = {<Register/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App