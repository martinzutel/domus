import Image from 'next/image';

type CardComponentProps = {
  title: string;
  description: string;
  image: string;
};

const CardComponent: React.FC<CardComponentProps> = ({ title, description, image }) => {
  return (
    <div className="h-[20rem] w-[16rem] bg-maincolor rounded-[1rem] border-2 border-white  overflow-hidden grid grid-rows-[8rem,1fr]">
      <div className="top-0 w-full bg-slate-500 relative">
        <Image src={image} layout="fill" objectFit="cover" objectPosition="center" quality={100} alt="hero"/>
      </div>
      <div className="w-full bg-zinc-900 p-[1.3rem]">
        <p className="text-white font-bold text-[1.5rem] leading-[1.2rem] font-sofia-pro mb-[1rem]">{title}</p>
        <p className="text-white text-[0.8rem] font-sofia-pro line-clamp-6">{description}</p>
      </div>
    </div>
  );
};

export default CardComponent;

