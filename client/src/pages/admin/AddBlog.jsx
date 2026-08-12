import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import 'quill/dist/quill.snow.css'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import {parse} from 'marked'

const AddBlog = () => {

  const {theme, axios} = useAppContext();

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [category, setCategory] = useState('Startup');
  const [isPublished, setIsPublished] = useState(false);

  const generateContent = async () => {
    if (!title) return toast.error('Please enter a title');
    try {
      setLoading(true);
      const {data} = await axios.post('/api/blog/generate', {prompt: title})
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content)
      } else {
        toast.error(data.message), {theme: theme === 'dark' ? 'dark' : 'light'};
      }
      
    } catch (err) {
      toast.error(err.message), {theme: theme === 'dark' ? 'dark' : 'light'};
    } finally {
      setLoading(false)
    }
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsAdding(true)

      const blog = {
        title, 
        subTitle, 
        description: quillRef.current.root.innerHTML,
        category,
        isPublished
      }
      const formData = new FormData();

      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)
      console.log(formData)

      const {data} = await axios.post('/api/blog/add', formData);
      if (data.success) {
        toast.success(data.message, {theme: theme === 'dark' ? 'dark' : 'light'});
        setImage(false)
        setTitle('')
        setSubTitle('')
        setCategory('Startup')
        quillRef.current.root.innerHTML = ''
      } else {
        toast.error(data.message, {theme: theme === 'dark' ? 'dark' : 'light'});
      }

    } catch (err) {
      toast.error(err.message, {theme: theme === 'dark' ? 'dark' : 'light'});
    } finally {
      setIsAdding(false)
    }
  }

  useEffect(() => {
    // initiate Quill only once
    if(!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
    }
  }, [])

  return (
    <form className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll dark:bg-bg-secondary-dark dark:text-text-secondary-dark' onSubmit={onSubmitHandler}>
      <div className='bg-white w-full max-w-3xl p-4 sm:p-10 sm:m-10 shadow rounded dark:bg-stone-900'>
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img className='mt-2 h-16 rounded cursor-pointer' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt='upload_area' loading='lazy'/>
          <input type="file" id='image' hidden required onChange={(e)=> setImage(e.target.files[0])} />
        </label>

        <p className='mt-4'>Blog Title</p>
        <input className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' type="text" placeholder='Type here' value={title} required onChange={(e)=> setTitle(e.target.value)} />

        <p className='mt-4'>Sub title</p>
        <input className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' type="text" placeholder='Type here' value={subTitle} required onChange={(e)=> setSubTitle(e.target.value)} />

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 mb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef}></div>
          {loading && (
            <div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'>
              <div className='w-8 h-8 border-2 border-t-white rounded-full animate-spin'>

              </div>
            </div>
          )}
          <button className='absolute -bottom-12 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer sm:bottom-1' type='button' disabled={loading} onClick={generateContent}>Generate with AI</button>
        </div>

        <p className='mt-24 sm:mt-4'>Blog category</p>
        <select onChange={e => setCategory(e.target.value)} className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded dark:text-text-secondary-dark/70' name="category">
          <option value="">Select category</option>
          {blogCategories.map((item, index) => {
            return <option value={item} key={index}>{item}</option>
          })}
        </select>

        <div className='flex gap-2 mt-4'>
          <p>Publish Now</p>
          <input className='scale-125 cursor-pointer' type="checkbox" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} />
        </div>

        <button className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm' type='submit' disabled={isAdding}>
          {isAdding ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
    </form>
  )
}

export default AddBlog
