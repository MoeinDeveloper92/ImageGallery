import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const App = () => {
  return (
    <div className='h-screen bg-base-200 flex flex-col overflow-hidden '>
      <Navbar />
      <div className='flex-1 ' >
        <Routes>
          <Route path="/" element={<Home />} />
          < Route path="/register" element={< Register />} />
          < Route path="/login" element={< Login />} />
        </Routes >
      </div>
      <Footer />
      <ToastContainer />
    </div >
  )
}

export default App