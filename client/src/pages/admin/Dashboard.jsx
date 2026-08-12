import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'

const Dashboard = () => {

  const {theme, axios} = useAppContext();
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  const fetchDashboard = async () => {
    try {
      const {data} = await axios.get('/api/admin/dashboard')
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message, {theme: theme === 'dark' ? 'dark' : 'light'});
    } catch (err) {
      toast.error(err.message, {theme: theme === 'dark' ? 'dark' : 'light'})
    }
  }

  useEffect(() => {
    fetchDashboard()
  },[])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50 dark:bg-bg-secondary-dark'>
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded-shadow cursor-pointer hover:scale-105 transition-all dark:bg-stone-900'>
          <img className='w-6 h-6' src={assets.dashboard_icon_1} alt='dashboard_icon_1' loading='lazy'/>
          <div>
            <p className='text-xl font-semibold text-gray-600 dark:text-text-primary-dark'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light dark:text-text-secondary-dark'>Blogs</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded-shadow cursor-pointer hover:scale-105 transition-all dark:bg-stone-900'>
          <img className='w-6 h-6' src={assets.dashboard_icon_2} alt='dashboard_icon_2' loading='lazy'/>
          <div>
            <p className='text-xl font-semibold text-gray-600 dark:text-text-primary-dark'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light dark:text-text-secondary-dark'>Comments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded-shadow cursor-pointer hover:scale-105 transition-all dark:bg-stone-900'>
          <img className='w-6 h-6' src={assets.dashboard_icon_3} alt='dashboard_icon_3' loading='lazy'/>
          <div>
            <p className='text-xl font-semibold text-gray-600 dark:text-text-primary-dark'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light dark:text-text-secondary-dark'>Drafts</p>
          </div>
        </div>
      </div>

      <div>
        <div className='flex items-center gap-3 m-4 mt-6 text-gray-600 dark:text-text-secondary-dark'>
          <img className='w-6 h-6' src={assets.dashboard_icon_4} alt='dashboard_icon_4' loading='lazy'/>
          <p>Latest Blogs</p>
        </div>

        <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white dark:bg-stone-900'>
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
              {dashboardData.recentBlogs.map((blog, index) => {
                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
