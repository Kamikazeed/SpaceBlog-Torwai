import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

  const {theme, setTheme, navigate, token} = useAppContext()

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <div className='flex justify-between items-center py-5 mx-4 sm:mx-20 xl:mx-32 '>
      <div className='flex items-center gap-1 sm:gap-2 cursor-pointer' onClick={()=>navigate('/')}>
        <img className='w-10 sm:w-14' src={assets.logo} alt='logo'/>
        <span className='text-xl sm:text-3xl font-bold text-gray-700 dark:text-text-primary-dark'>Spaceblog</span>
      </div>


      <div className='flex gap-2 sm:gap-5'>
        <button className='flex items-center cursor-pointer' onClick={() => toggleTheme()}>
          <img className='h-6 w-6 sm:h-7 sm:w-7' src={theme === 'dark' ? assets.moon_icon : assets.sun_icon} alt="mode_icon"/>
        </button>
        <button className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-5 py-2 sm:px-10 sm:py-2.5' onClick={()=>navigate('/admin')}>
          {token ? 'Dashboard' : 'Login'}
          <img className='w-3' src={assets.arrow} alt='arrow_icon' loading='lazy'/>
        </button>
      </div>
    </div>
  )
}

export default Navbar
