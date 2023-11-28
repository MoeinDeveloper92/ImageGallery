import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PrivateRoute from './components/PrivateRoute'
import Images from './pages/Images'
const App = () => {
  return (
    <div className='h-screen bg-base-200 flex flex-col overflow-hidden '>
      <Navbar />
      <div className='flex-1 ' >
        <Routes>
          <Route path="/" element={<Home />} />
          < Route path="/register" element={< Register />} />
          < Route path="/login" element={< Login />} />
          <Route path='/images' element={<PrivateRoute />}>
            <Route path='/images' element={<Images />} />
          </Route>
        </Routes >
      </div>
      <Footer />
      <ToastContainer />
    </div >
  )
}

export default App