import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const CommentTableItem = ({comment, fetchComments}) => {

  const {theme, axios} = useAppContext();
  const {blog, createdAt, _id} = comment;
  const BlogDate = new Date(createdAt)

  const approveComment = async (req, res) => {
    try {
      const {data} = await axios.post('/api/admin/approve-comment', {id: _id})
      if (data.success) {
        toast.success(data.message, {theme: theme === 'dark' ? 'dark' : 'light'});
        fetchComments()
      } else {
        toast.error(data.message, {theme: theme === 'dark' ? 'dark' : 'light'});
      }
      
    } catch (err) {
      toast.error(err.message, {theme: theme === 'dark' ? 'dark' : 'light'});
    }
  }

  const deleteComment = async (req, res) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this comment?');
      if (!confirm) return;

      const {data} = await axios.post('/api/admin/delete-comment', {id: _id})
      if (data.success) {
        toast.success(data.message, {theme: theme === 'dark' ? 'dark' : 'light'});
        fetchComments()
      } else {
        toast.error(data.message, {theme: theme === 'dark' ? 'dark' : 'light'});
      }
      
    } catch (err) {
      toast.error(err.message, {theme: theme === 'dark' ? 'dark' : 'light'});
    }
  }

  return (
    <tr className='border-y corder-gray-300'>
      <td className='px-6 py-4'>
        <b className='font-medium text-gray-600 dark:text-text-secondary-dark/90'>Blog</b> : {blog.title}
        <br />
        <br />
        <b className='font-medium text-gray-600 dark:text-text-secondary-dark/90'>Name</b> : {comment.name}
        <br />
        <b className='font-medium text-gray-600 dark:text-text-secondary-dark/90'>comment</b> : {comment.content}
      </td>

      <td className='px-6 py-4 max-sm:hidden'>
        {BlogDate.toLocaleDateString()}
      </td>
      <td className='px-6 py-4'>
        <div className='inline-flex items-center gap-4'>
          {!comment.isApproved ? 
          <img className='w-5 hover:scale-110 transtion-all cursor-pointer' onClick={approveComment} src={assets.tick_icon} alt='tick_icon' loading='lazy'/> :
          <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p>
          }
          <img className='w-8 sm:w-6 hover:scale-110 transition-all cursor-pointer' onClick={deleteComment} src={assets.bin_icon} alt='bin_icon' loading='lazy'/>
        </div>
      </td>
    </tr>
  )
}

export default CommentTableItem
