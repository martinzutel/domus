  "use client";
  import React from 'react'

  export default function Landing() {
    return (
      <main className=' h-[120rem]'>
        <nav className="z-[999] fixed top-0 w-full">
          <div className= 'w-full h-[4rem] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-[0.5rem] space-x-[3rem]'>

            <button className=' text-white'> 
              about
            </button>

            <button className=' text-white'> 
              socials
            </button>

            <button className=' text-white'> 
              socials
            </button>

            
          </div>
        </nav>
      

        <div className='flex items-center justify-center h-screen flex-col' >

          <p className='text-white text-[20rem] font-extrabold  leading-[20rem]' > 
            found
          </p> 
        
          <p className='text-white text-[2.3rem] mb-[2rem]'>
            a simple solution for a very complex problem
          </p>
        
          <div> 
            <button className='text-black font-semibold text-lg bg-white  pt-[0.11rem] pb-[0.25rem]  px-[0.6rem] rounded-full mr-[0.7rem]'>log in</button>
            <button className='text-black font-semibold text-lg bg-white  pt-[0.11rem] pb-[0.25rem]  px-[0.6rem] rounded-full'>get started</button>
          </div>

        </div>
      </main>
    )
  }
