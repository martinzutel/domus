import React from 'react'
import { BsFillPersonFill } from "react-icons/bs";

const Searchbar = () => {

    return (
    <div className='w-full flex justify-center items-center'>

        <div className='h-[40px] w-[350px] flex justify-center items-center '>
 
        
            <input type="text" placeholder='Search' className='h-full w-full bg-darkgre placeholder-white outline-none rounded-l-full pl-4'/>
            <button className='h-full  bg-darkgre text-4xl flex justify-center items-center text-coolred hover:bg-coolred hover:text-darkgre'> <BsFillPersonFill className='m-[10px]'/> </button>
            <button className='h-full  bg-darkgre text-4xl flex justify-center items-center text-coolred hover:bg-coolred hover:text-darkgre'> <BsFillPersonFill className='m-[10px]'/>  </button>
            <button className='h-full  bg-darkgre text-4xl flex justify-center items-center text-coolred hover:bg-coolred hover:text-darkgre rounded-r-full'> <BsFillPersonFill className='ml-[5px] mr-[10px]'/> </button>
            

        </div>
        
       </div>
    )

   
}

export default Searchbar
