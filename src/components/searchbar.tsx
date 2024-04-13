import React from 'react'
import { BsFillPersonFill } from "react-icons/bs";

const Searchbar = () => {

    return (
        <div className='w-full h-[52px] flex justify-center items-center'>
        <div className='rounded-l-full h-[58px] w-[280px]'>
            <input type="text" placeholder='Search' className='h-[58px] w-[280px] bg-darkgre placeholder-white outline-none rounded-l-full pl-4'/>
        </div>

        <button className='h-[58px] w-[65px] bg-darkgre text-4xl flex justify-center items-center text-coolred hover:bg-coolred hover:text-darkgre'> <BsFillPersonFill/> </button>
        <button className='h-[58px] w-[65px] bg-darkgre text-4xl flex justify-center items-center text-coolred hover:bg-coolred hover:text-darkgre'> <BsFillPersonFill/>  </button>
        <button className='h-[58px] w-[72px] bg-darkgre rounded-r-full text-4xl flex justify-center items-center text-coolred hover:bg-coolred hover:text-darkgre'> <BsFillPersonFill className='mr-[5px]'/> </button>
    </div>
    )

   
}

export default Searchbar
