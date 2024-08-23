'use client'
import React from 'react';
import Image from 'next/image';

type CardComponentProps = {
  id: string;
  name: string;
  about: string;
  image: string;
  interests: string[];
  contact: string; // Ensure this field is included
  onClick: () => void;
};

const CardComponent: React.FC<CardComponentProps> = ({ name, about, image, interests, contact, onClick }) => {
  return (
    <div
      className="h-[400px] w-[320px] grid grid-rows-[8rem,1fr] overflow-hidden rounded-[1rem] border-secondarycolor cursor-pointer"
      onClick={onClick}
    >
      <div className="top-0 w-full bg-slate-500 relative">
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
          alt="hero"
          sizes="(max-width: 480px) 100vw, 50vw"
        />
      </div>
      <div className="w-full bg-darkgre p-[1.3rem]">

        <div className="h-[204px]">
          <p className="text-white font-bold text-[1.5rem] leading-[1.2rem] font-sofia-pro mb-[1rem]">
            {name}
          </p>
          <p className="text-white text-[0.8rem] font-sofia-pro line-clamp-6">{about}</p>
        </div>

        <div className="flex flex-nowrap space-x-2 overflow-x-auto">
          {interests.slice(0, 4).map((interest, index) => (
            <div
              key={index}
              className="rounded-full bg-coolred text-secondarycolor pb-[4px] pl-[9px] space-x-2 inline-block"
            >
              <span className="text-white text-[0.8rem] font-sofia-pro mr-[0.5rem] overflow-hidden whitespace-nowrap">
                {interest}
              </span>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default CardComponent;
