import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import Manager from './Manager'
import Footer from './Footer'
function App() {

  return (
    <>
    <div className='h-[100vh] flex flex-col'>

    <Navbar/>
    <Manager/>
    <Footer/>
    </div>
    </>
  )
}

export default App
