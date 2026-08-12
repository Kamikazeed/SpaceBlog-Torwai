import React, { useEffect, useState } from 'react'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'

const Comments = () => {

  const {theme, axios} = useAppContext();
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')

  const fetchComments = async () => {
    try {
      const {data} = await axios.get('/api/admin/comments')
      data.success ? setComments(data.comments) : toast.error(data.message, {theme: theme === 'dark' ? 'dark' : 'light'});
      
    } catch (err) {
      toast.error(err.message, {theme: theme === 'dark' ? 'dark' : 'light'});
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50 dark:bg-bg-secondary-dark'>
      <div className='flex justify-between items-center max-w-3xl'>
        <h1 className='dark:text-text-secondary-dark'>Comments</h1>
        <div className='flex gap-4'>
          <button className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Approved' ? 'text-primary' : 'text-gray-700 dark:text-text-secondary-dark/90'}`} onClick={() => setFilter('Approved')}>Approved</button>
          <button className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Not Approved' ? 'text-primary' : 'text-gray-700 dark:text-text-secondary-dark/90'}`} onClick={() => setFilter('Not Approved')}>Not Approved</button>
        </div>
      </div>

      <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide dark:bg-stone-900'>
        <table className='w-full text-sm text-gray-500 dark:text-text-secondary-dark/70'>
          <thead className='text-xs text-gray-700 text-left uppercase dark:text-text-secondary-dark'>
            <tr>
              <th className='px-6 py-3' scope='col'>Blog Title & Comment</th>
              <th className='px-6 py-3 max-sm:hidden' scope='col'>Date</th>
              <th className='px-6 py-3' scope='col'>Action</th>
            </tr>
          </thead>

          <tbody>
            {comments.filter((comment) => {
              if (filter === 'Approved') return comment.isApproved === true;
              return comment.isApproved === false;
            }).map((comment, index) => <CommentTableItem key={comment._id} comment={comment} index={index + 1} fetchComments={fetchComments} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments
