import Image from 'next/image';
import ParentComponent from './signin/parent';

const Intro: React.FC = () => {
  

  return (
    <div>
      <div className="flex items-center justify-center">

        <div className="h-[500px] w-[2000px] bg-maincolor flex items-center justify-center px-[155px] self-center">
         
          <div className="w-[600px] h-full pl-[80px] pt-[40px]">
            <p className="font-sofia-pro font-thin text-9xl text-white mb-[20px]">
              domus
            </p>
            <p className="font-sofia-pro font-bold text text-5xl text-white ">
              Encontra el mejor host de espacios compartidos, conoce y matchea con la persona ideal. 
            </p>
          </div>

          <div className='w-[600px] h-full p-[40px]'>

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
