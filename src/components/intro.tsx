'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import LoginRegisterPopup  from '@/components/popup'; 

interface SignInButtonProps {
  showPopup: boolean;
  togglePopup: () => void;
}

const Intro: React.FC = () => {
  
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
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

      <div className="block">
        <div className="flex justify-center content-center">
          <SignInButton showPopup={showPopup} togglePopup={togglePopup} />
        </div>
      </div>

      {showPopup && <LoginRegisterPopup togglePopup={false} />}
    </div>
  );
};

const SignInButton: React.FC<SignInButtonProps> = ({ showPopup, togglePopup }) => {
  return (
    <button
      onClick={togglePopup}
      className="border-solid text-darkgre font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full mr-[0.7rem] font-sofia-pro hover:bg-coolredhl active:bg-coolreddrk"
    >
      {showPopup ? "Close Popup" : "Sign In"}
    </button>
  );
};

export default Intro;
