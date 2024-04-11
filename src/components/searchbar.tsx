import React from 'react'

const Searchbar = () => {

    return (
        <div className='w-full h-[52px] flex justify-center items-center'>
        <div className='rounded-l-full h-[58px] w-[280px]'>
            <input type="text" placeholder='Search' className='h-[58px] w-[280px] bg-orange-300 outline-none rounded-l-full pl-4'/>
        </div>

        <button className='h-[58px] w-[65px] bg-slate-500'></button>
        <button className='h-[58px] w-[65px] bg-orange-300'></button>
        <button className='h-[58px] w-[72px] bg-slate-500 rounded-r-full'></button>
    </div>
    )

   
}

export default Searchbar
