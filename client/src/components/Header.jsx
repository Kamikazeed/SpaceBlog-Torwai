import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {

  const {setInput, input} = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput('')
    inputRef.current.value = ''
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-20 mb-8'>

        <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
          <p>New: AI feature integrated</p>
          <img className='w-5 h-5' src={assets.star_icon} alt='star_icon'/>
        </div>

        <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700 dark:text-text-primary-dark'>
          Your own <span className='text-primary'>blogging</span>
          <br />
          platform.
        </h1>
        <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500 dark:text-text-secondary-dark'>This is your space to think out loud, to share what matters, and to write without filters. whether it's one word or a thousand, your story starts right here.</p>

        <form className='flex justify-between max-w-lg max-sm:scale-75 mx-auto text-gray-500 border border-gray-300 bg-white rounded overflow-hidden dark:bg-bg-secondary-dark' onSubmit={onSubmitHandler}>
          <input className='w-full pl-4 outline-none dark:text-text-primary-dark' type="text" placeholder='Search for blogs' required ref={inputRef} />
          <button className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer' type='submit'>Search</button>
        </form>

      </div>

      <div className='text-center'>
        {input && 
        <button className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer dark:text-text-primary-dark' onClick={onClear}>Clear Search</button>
        }
      </div>
      <img className='absolute w-full h-auto top-0 -z-1 opacity-50 lg:-top-50' src={assets.gradientBackground} alt='background'/>
    </div>
  )
}

export default Header
