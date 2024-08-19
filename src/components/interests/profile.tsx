import React, { ReactNode } from 'react'
import Image from 'next/image'
import CheckboxGroup from './CheckboxGroup';



const interests: string[] = [
  "fitness",
  "football",
  "basketball",
  "tennis",
  "golf" ,
  "hockey",
  "tennis",
  "golf" ,
  "hockey",
  "hockey",


];


function Profile() {

  return (

    <div className='w-screen h-screen flex justify-center items-center'>

        <div className='h-[500px] w-[1080px] bg-maincolor border-white border-solid border rounded-3xl flex flex-row p-10'>
          
                <div className='min-w-80 relative h-full rounded-2xl overflow-hidden mr-10'>

                    <Image
                        src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmni5ByUlopIBq0AvXN--ItFxamhwhdM5I2A&s'}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        quality={100}
                        alt="hero"
                        sizes="(max-width: 430px) 100vw, 50vw"
                    />

                </div>

                <div className='w-[900px]  mr-10'>

                    <h1 className='text-white font-bold text-3xl pb-1'>Martin Zutelman</h1>

                    <p className='text-white font-semibold min-w-14'>Hi my name is Carmen Winstead. I'm 17 years old. I am very similar to you. Did I mention to you that I'm dead? A few years ago a group of girls pushed me down a sewer hole to try and embarrass me. When I didn't come back up the police came.The girl said that I had fell and everyone believed them. The police found my body in the sewer. I had a broken neck and my face was torn off. Send this message to 15 people after you listened the whole message if you value your life. </p>


                </div>

                <div className='flex flex-col w-full h-full'>

                <div>
                  <div className="flex flex-wrap gap-2">

                    {interests.map((interest, index) => (
                      <div
                        key={index}
                        className="rounded-full bg-coolred text-secondarycolor h-7 px-2 flex items-center"
                      >
                        <span className="text-white text-[0.8rem] font-sofia-pro ">
                          {interest}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

                 
               
        </div>
        
    </div>

   
  )
}

export default Profile
