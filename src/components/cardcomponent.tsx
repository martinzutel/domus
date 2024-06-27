import Image from 'next/image';
import Link from 'next/link';


type CardComponentProps = {
  name: string;
  about: string;
  image: string;
};

const CardComponent: React.FC<CardComponentProps> = ({ name, about, image }) => {
  return (
    
      <div className=" h-[400px] w-[320px]  grid grid-rows-[8rem,1fr]  overflow-hidden rounded-[1rem]   border-secondarycolor">
        <div className="top-0 w-full bg-slate-500 relative">
          <Image src={image} layout="fill" objectFit="cover" objectPosition="center" quality={100} alt="hero"/>
        </div>
        <div className="w-full bg-darkgre p-[1.3rem]">
          <div className='h-[200px]'>
            <p className="text-white font-bold text-[1.5rem] leading-[1.2rem] font-sofia-pro mb-[1rem]">{name}</p>
            <p className="text-white text-[0.8rem] font-sofia-pro line-clamp-6">{about}</p>
          </div>
          

          <Link href="/login" className='border-solid   text-darkgre font-black bg-coolred  text-lg pt-[0.28rem] pb-[0.47rem]  px-[2rem] rounded-full mr-[0.7rem] font-sofia-pro hover:bg-coolredhl active:bg-coolreddrk'>
            book
          </Link> 
        </div>


        

      </div>
   
  );
};

export default CardComponent;

