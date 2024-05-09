'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import ParentComponent from './signin/parent';

const Intro: React.FC = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const togglePopup = () => {
    setShowPopup(true); 
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center">
        <div className="h-[750px] w-[2000px] bg-maincolor flex items-center justify-center px-[155px] self-center">
          <div className="h-[650px] w-[1000px] pt-[100px] pl-[60px]">
            <p className="font-sofia-pro font-thin text-9xl text-white mb-[50px]">
              domus
            </p>
            <p className="font-sofia-pro font-bold text text-5xl text-white pr-[100px]">
              encontra tu lugar, tu hogar, tu espacio, tu lugar en el mundo
              encontra tu lugar, tu hogar, tu espacio, tu lugar en el mundo
              encontra tu lugar, tu hogar, tu espacio, tu lugar en el mundo
            </p>
          </div>

          <Image
            src="/vectors/House bookshelves-amico.svg"
            alt=""
            width={500}
            height={500}
            objectPosition="center"
            quality={100}
          />
        </div>
      </div>

      <ParentComponent /> 

     
    </div>
  );
};



export default Intro;
