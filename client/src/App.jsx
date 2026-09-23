import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import HomeLayout from './layouts/HomeLayout'
import Users from './pages/Users'
import CreateBlogForm from './components/CreateBlogForm'
import BlogLists from './components/BlogLists'


const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        {/* <Route path='/' element={<HomeLayout />}> */}
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        {/* </Route> */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/blogs' element={<BlogLists />} />
      </Routes>

    </div>
  )
}

export default App
