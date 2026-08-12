import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({blog, index}) => {

  const navigate = useNavigate()
  const {title, subTitle, category, image, _id} = blog;

  return (
    <div className='w-full rounded-lg overflow-hidden shadow hover:shadow-primary duration-300 cursor-pointer dark:bg-bg-secondary-dark' onClick={()=>navigate(`/blog/${_id}`)}>
      <img className='aspect-video w-auto h-auto' src={image} alt={`thumpnail_${index}`} loading='lazy'/>
      <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>

      <div className='p-5'>
        <h5 className='mb-2 font-medium text-gray-900 dark:text-text-primary-dark'>{title}</h5>
        <p className='mb-3 text-xs text-gray-600 dark:text-text-secondary-dark/70' dangerouslySetInnerHTML={{__html: subTitle}}></p>
      </div>
    </div>
  )
}

export default React.memo(BlogCard)
