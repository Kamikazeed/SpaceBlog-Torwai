import React from 'react'
import { assets, footer_data } from '../assets/assets'
import { useAppContext } from '../context/AppContext';

const Footer = () => {

    const {navigate} = useAppContext()

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
      <div  className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>
        <div>
          <div className='flex items-center gap-2 cursor-pointer' onClick={()=>navigate('/')}>
            <img className='w-12 sm:w-14' src={assets.logo} alt='logo'/>
            <span className='text-2xl sm:text-3xl font-bold text-gray-700 dark:text-text-primary-dark'>Spaceblog</span>
          </div>
          <p className='max-w-[410px] mt-6 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus debitis et ipsum! Repudiandae obcaecati a ad cupiditate quod placeat debitis?</p>
        </div>

        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5 '>
          {footer_data.map((section, index) => (
            <div key={index}>
              <h5 className='font-semibold text-base text-gray-900 md:mb-5 mb-2 dark:text-text-secondary-dark/70'>{section.title}</h5>
              <ul className='text-sm space-y-1'>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a className='hover:underline transition-all' href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>Copyright 2026 © SpaceBlog Torwai - All Right Reserved.</p>
    </div>
  )
}

export default Footer
