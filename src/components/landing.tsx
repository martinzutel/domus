    "use client";
    import React from 'react'

    import Link from 'next/link';

    export default function Landing() {
      return (
        <main className=' h-[120rem]'>
          <nav className="z-[999] fixed top-0 w-full">
            <div className= 'w-full h-[2.5rem] flex items-center justify-center bg-maincolor bg-opacity-80 backdrop-blur-[0.5rem] space-x-[3rem]  py-9'>

              <button className='text-secondarycolor font-bold font-sofia-pro'> 
                services
              </button>

              <button className=' text-secondarycolor font-bold font-sofia-pro'> 
                about
              </button>

              <button className=' text-secondarycolor font-bold font-sofia-pro'> 
                contact
              </button>

              
            </div>
          </nav>
        

          <div className='flex items-center justify-center h-screen flex-col' >

            <p className='text-secondarycolor text-[18rem] font-thin leading-[20rem] font-sofia-pro' > 
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
        </main>
      )
    }
