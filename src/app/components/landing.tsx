"use client";
import React from 'react'

export default function Landing() {
  return (
    <div className='flex items-center justify-center h-screen flex-col' >

  
      <p className='text-white text-9xl font-extrabold'> 
        Sound
      </p> 
     
      <p className='text-white'>
        a simple solution for a very complex problem
      </p>

      <div> 
        <button className='text-black font-semibold text-lg bg-white  pt-[0.11rem] pb-[0.25rem]  px-[0.6rem] rounded-full mr-[0.7rem]'>log in</button>
        <button className='text-black font-semibold text-lg bg-white  pt-[0.11rem] pb-[0.25rem]  px-[0.6rem] rounded-full'>get started</button>
      </div>

    </div>
  )
}
