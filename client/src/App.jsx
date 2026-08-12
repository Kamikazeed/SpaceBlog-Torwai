import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Loader from './components/Loader'
import Home from './pages/Home'
import Blog from './pages/Blog' 
const Layout = lazy(() => import('./pages/admin/Layout'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const AddBlog = lazy(() => import('./pages/admin/AddBlog'))
const ListBlog = lazy(() => import('./pages/admin/ListBlog'))
const Comments = lazy(() => import('./pages/admin/Comments'))
const Login = lazy(() => import('./components/admin/Login'))
import { useAppContext } from './context/AppContext'

const App = () => {

  const {theme, token} = useAppContext();

  return (
    <div className='relative w-full' data-theme={theme || 'light'}>
      <div className='absolute w-full -z-2 dark:bg-bg-primary-dark'>
        <ToastContainer />
        <Suspense fallback={<Loader />}>
          <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/blog/:id' element={<Blog />} />
            <Route path='/admin' element={token ? <Layout /> : <Login />}>
              <Route index element={<Dashboard />} />
              <Route path='addBlog' element={<AddBlog />} />
              <Route path='listBlog' element={<ListBlog />} />
              <Route path='comments' element={<Comments />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App
