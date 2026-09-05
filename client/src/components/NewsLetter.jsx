import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const NewsLetter = () => {

  const {theme} = useAppContext()

  const [email, setEmail] = useState('')

  const onsubmit = async (e) => {
    e.preventDefault();
    try {
      if (email === '') {
        toast.error('Email required', {theme: theme === 'dark' ? 'dark' : 'light'});
      } else {
        setEmail('')
        toast.success('subscribe success', {theme: theme === 'dark' ? 'dark' : 'light'});
      }
    } catch {
      toast.error('subscribe failed', {theme: theme === 'dark' ? 'dark' : 'light'});
    }
  }

  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
      <h1 className='md:text-4xl text-2xl font-semibold dark:text-primary'>Never Miss a Blog!</h1>
      <p className='md:text-lg text-gray-500/70 pb-8 dark:text-text-secondary-dark/70'>Subscribe to get the latest blog, new tech, and exclusive news.</p>

      <form className='flex items-center justify-between max-w-2xl w-full px-8 sm:px-0 md:h-13 h-12'>
        <input className='border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-400' type="text" value={email} placeholder='Enter your email id' onChange={e => setEmail(e.target.value)} required/>
        <button className='mb:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none' type='submit' onClick={onsubmit}>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetter
