import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-around items-center  w-full mx-auto py-2 bg-black '>
      <h1 className='font-bold text-2xl text-red-500  '>Password Manager</h1>
      <div className='flex'>

      <img className='w-6 bg-white border' src='/github.png'></img>
      <span className='inline-block font-semibold text-white'>GitHub</span>
      </div>
    </div>
  )
}

export default Navbar
