import Image from 'next/image';
import ParentComponent from './signin/parent';

const Intro: React.FC = () => {
  

  return (
    <div>
      <div className="flex items-center justify-center">

        <div className="w-[300px] h-[600px] bg-maincolor flex flex-col items-center justify-center  self-center
                        sm:h-[500px] sm:w-[2000px] sm:flex-row sm:px-[155px]
        ">
         
          <div className="w-[300px] h-full pt-[50px]
                          sm:w-[600px] sm:pl-[80px] sm:pt-[40px]
          ">
            <p className="font-sofia-pro text-7xl mb-[20px] text-center font-bold text-coolred
                          sm:text-9xl sm:text-left">
              domus
            </p>
            <p className="font-sofia-pro font-bold text text-5xl text-white text-center
                          sm:text-left">
              Encontra el mejor host de espacios compartidos, conoce y matchea con la persona ideal. 
            </p>

          </div>

          <div className='w-[300px] h-full p-[40px] hidden
                          sm:-[600px] sm:inline-block'>

            <div className='w-full h-full relative p-[100px]'>
              <Image
                src="/vectors/House bookshelves-amico.svg"
                alt=""
                layout='fill'
                objectPosition="center"
                quality={100}
              />
            </div>

          </div>

        </div>
      </div>

      <ParentComponent /> 


    </div>
  );
};



export default Intro;
