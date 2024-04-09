import React from 'react'

export default function page() {
  return (
        <nav>
            <div className='w-full h-[60px] flex justify-center items-center bg-maincolor bg-opacity-80 backdrop-blur-sm '>
               <input type="text" placeholder='  Search...' className='rounded-l-full h-[25px]'/>
               <button className='h-[25px] w-[25px] bg-slate-500'></button>
               <button className='h-[25px] w-[25px] bg-orange-300'></button>
               <button className='h-[25px] w-[25px] bg-slate-500 rounded-r-full'></button>
            </div>
        </nav>

  )
}
