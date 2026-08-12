import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { toast } from "react-toastify";

const Login = () => {
  
  const {theme, axios, setToken} = useAppContext();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('/api/admin/login', {email, password});
      if(data.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        axios.defaults.headers.common['Authorization'] = data.token;
      } else {
        toast.error(data.message, {theme: theme === 'dark' ? 'dark' : 'light'})
      }
      
    } catch (err) {
      toast.error(err.message, {theme: theme === 'dark' ? 'dark' : 'light'})
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold dark:text-text-primary-dark'><span className='text-secondary'>Admin</span> Login</h1>
            <p className='font-light dark:text-text-secondary-dark'>Enter your credentials to access the admin panel</p>
          </div>

          <form className='flex flex-col gap-4 mt-6 w-full sm:max-w-md sm:max-w-md dark:text-text-secondary-dark' onSubmit={handleSubmit} >
            <div className='flex flex-col'>
              <label>email</label>
              <input className='border-b-2 border-gray-300 p-2 outline-none' type="email" required placeholder='Your email id' value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div className='flex flex-col'>
              <label>Password</label>
              <input className='border-b-2 border-gray-300 p-2 outline-none dark:text-text-secondary-dark' type="password" required placeholder='Your password' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all' type='submit'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
