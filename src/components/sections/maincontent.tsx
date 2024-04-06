
import React from 'react';
import Link from 'next/link';

const MainContent = () => {
  return (
    <div className='flex items-center justify-center h-screen flex-col'>
      <p className='text-secondarycolor text-[20rem] font-thin leading-[20rem] font-sofia-pro'> 
        domus
      </p> 
      <p className='text-secondarycolor text-[2.3rem] mb-[2rem] font-sofia-pro'>
        a simple solution for a very complex problem.
      </p>
      <div> 
        <Link href="/login" className='border-solid border-white border-2 text-white  text-lg bg-maincolor b  pt-[0.28rem] pb-[0.47rem]  px-[2rem] rounded-full mr-[0.7rem] font-sofia-pro'>
          log in
        </Link> 
        <Link href="/get-started"  className='border-solid border-white border-2 text-white  text-lg bg-maincolor b  pt-[0.28rem] pb-[0.47rem]  px-[0.8rem] rounded-full mr-[0.7rem] font-sofia-pro '>
          get started
        </Link>
      </div>
    </div>
  );
}

export default MainContent;