import Image from 'next/image'

export default function Home() {
    return (
      <main>
        <div className="flex items-center justify-center h-screen">

          <div className="  h-[20rem] w-[16rem] bg-black rounded-[1rem] overflow-hidden grid grid-rows-[8rem,1fr] space-x-5">

            <div className=' top-0 w-full  bg-slate-500 relative '>

                <Image src='/images/puppys.jpg' layout='fill' objectFit='cover' objectPosition='center' quality={100} alt='hero' />

            </div>

            <div className='w-full bg-zinc-900 p-[1.3rem]'> 
              <p className=' text-white font-bold text-[1.5rem] leading-[1.2rem] font-poppins mb-[1rem]'>
                dos perritos
              </p>

              <p className=' text-white text-[0.8rem] font-poppin line-clamp-6'>
                 A los perritos les gusta mucho comer el pollo y armar teclados y comer comida cacera y tomar gomitas de vitamina c todas las noches y dormir en la cama de sus dueños. A los perritos les gusta mucho comer el pollo y armar teclados y comer comida cacera y tomar gomitas de vitamina c todas las noches y dormir en la cama de sus dueños.
              </p>
            </div>
        
          </div>

        </div>
      </main>
    );
  }
