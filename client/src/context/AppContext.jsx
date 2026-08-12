import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const navigate = useNavigate()

  const [token, setToken] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [input, setInput] = useState('')
  const [theme, setTheme] = useState(localStorage.getItem('theme'))

  const fetchData = async () => {
    try {
      const {data} = await axios.get('/api/blog/all');
      data.success ? setBlogs(data.blogs) : toast.error(data.message)
      
    } catch (err) {
      toast.error(err.message)
    }
  }

  useEffect(() => {
    const interceptorId = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          setToken(null)
          toast.error('Invalid or expired token')
          navigate('/admin')
        }
        return Promise.reject(error)
      }
    )
  },[])

  useEffect(() => {
    fetchData();
    const token = localStorage.getItem('token')
    if (token) {
      setToken(token)
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }
  },[])

  const value = useMemo(() => ({
    axios,
    fetchData,
    navigate,
    token, setToken,
    blogs, setBlogs,
    input, setInput,
    theme, setTheme,
  }), [fetchData, blogs, input, theme, token])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
};