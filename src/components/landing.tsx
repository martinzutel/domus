
 import React from 'react'

import ServicesSection from './sections/services';

import MainContent from './sections/maincontent';

import AboutSection from './sections/about';

export default function Landing() {
  return (

    <main>
    
      <nav className="z-[999] fixed top-0 w-full">
        <div className= 'w-full h-4 flex items-center justify-center bg-maincolor bg-opacity-80 backdrop-blur-sm space-x-7 py-6'>

          <button className= 'text-secondarycolor font-sofia-pro text'> 
            services
          </button>

          <button className= 'text-secondarycolor font-sofia-pro '> 
            about
          </button>

          <button className= 'text-secondarycolor font-sofia-pro '> 
            contact
          </button>

        </div>
      </nav>
    

      <MainContent/>
      
      <ServicesSection/>

      <AboutSection/>

    </main>
  )
}
