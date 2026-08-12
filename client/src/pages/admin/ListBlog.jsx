import React, { useEffect, useState } from 'react'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'

const ListBlog = () => {

  const {theme, axios} = useAppContext();
  const [blogs, setblogs] =useState([])

  const fetchBlogs = async () => {
    try {
      const {data} = await axios.get('/api/admin/blogs')
      if(data.success) {
        setblogs(data.blogs)
      } else {
        toast.error(data.message, {theme: theme === 'dark' ? 'dark' : 'light'});
      }
      
    } catch (err) {
      toast.error(err.message, {theme: theme === 'dark' ? 'dark' : 'light'});
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 dark:bg-bg-secondary-dark'>
      <h1 className='dark:text-text-secondary-dark'>All blogs</h1>

      <div className='relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white dark:bg-stone-900'>
        <table className='w-full text-sm text-gray-500 dark:text-text-secondary-dark/70'>
          <thead className='text-xs text-gray-600 text-left uppercase dark:text-text-secondary-dark'>
            <tr>
              <th className='px-2 py-4 xl:px-6' scope='col'>#</th>
              <th className='px-2 py-4' scope='col'>Blog Title</th>
              <th className='px-2 py-4 max-sm:hidden ' scope='col'>Date</th>
              <th className='px-2 py-4 max-sm:hidden ' scope='col'>Status</th>
              <th className='px-2 py-4' scope='col'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog, index) => {
              return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListBlog
