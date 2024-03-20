    "use client";
    import React from 'react'

    import Link from 'next/link';

    export default function Landing() {
      return (
        <main className=' h-[120rem]'>
          <nav className="z-[999] fixed top-0 w-full">
            <div className= 'w-full h-[2.5rem] flex items-center justify-center bg-maincolor bg-opacity-80 backdrop-blur-[0.5rem] space-x-[3rem]'>

              <button className='text-secondarycolor font-bold'> 
                services
              </button>

              <button className=' text-secondarycolor font-bold'> 
                contact
              </button>

              <button className=' text-secondarycolor font-bold'> 
                about
              </button>

              
            </div>
          </nav>
        

          <div className='flex items-center justify-center h-screen flex-col' >

            <p className='text-secondarycolor text-[20rem] font-extrabold  leading-[20rem]' > 
              found
            </p> 
          
            <p className='text-secondarycolor text-[2.3rem] mb-[2rem]'>
              a simple solution for a very complex problem
            </p>
          
            <div> 

              <Link href="/login" className='text-maincolor font-semibold text-lg bg-secondarycolor  pt-[0.28rem] pb-[0.47rem]  px-[0.8rem] rounded-full mr-[0.7rem]'>
                log in
              </Link>

              <Link href="/get-started"  className='text-maincolor font-semibold text-lg bg-secondarycolor   pt-[0.28rem] pb-[0.47rem]  px-[0.8rem] rounded-full'>
                get started
              </Link>

            </div>

          </div>
        </main>
      )
    }
