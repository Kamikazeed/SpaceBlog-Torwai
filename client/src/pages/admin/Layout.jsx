import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import {useAppContext} from '../../context/AppContext'

const Layout = () => {

  const {axios, setToken, theme, setTheme, navigate} = useAppContext()

  const Logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null)
    navigate('/')
  }

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
    <>
      <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200 '>
        <div className='flex items-center gap-1 sm:gap-2 cursor-pointer' onClick={()=>navigate('/')}>
          <img className='w-10 sm:w-14' src={assets.logo} alt='logo'/>
          <span className='text-xl sm:text-3xl font-bold text-gray-700 dark:text-text-primary-dark'>Spaceblog</span>
        </div>
        <div className='flex gap-2 sm:gap-5'>
          <button className='flex items-center cursor-pointer' onClick={() => toggleTheme()}>
            <img className='h-6 w-6 sm:h-7 sm:w-7' src={theme === 'dark' ? assets.moon_icon : assets.sun_icon} alt="mode_icon"/>
          </button>
          <button className='text-sm px-6 py-2 bg-primary text-white rounded-full cursor-pointer' onClick={Logout}>Logout</button>
        </div>
      </div>

      <div className='flex min-h-[calc(100vh-70px)] '>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default Layout
