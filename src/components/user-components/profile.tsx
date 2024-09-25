'use client';
import React from 'react';
import Image from 'next/image';
import { IoMdArrowRoundBack } from "react-icons/io";

type ProfileProps = {
  id: string;
  name: string;
  about: string;
  image: string;
  interests: string[];
  contact: string;
  onClose: () => void;
};

const Profile: React.FC<ProfileProps> = ({ name, about, image, interests, contact, onClose }) => {
  

  const handleRequest = () => {
    console.log(`Match request sent to ${name}`);
    
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-30 top-0 backdrop-blur-sm ">
      <div className="h-[500px] w-[1080px] bg-maincolor border-secondarycolor rounded-3xl flex flex-row p-10 relative">
        <button className="left-0 top-0 text-coolred text-3xl absolute mt-4 ml-4" onClick={onClose}>
          <IoMdArrowRoundBack />
        </button>
        <div className="min-w-80 relative h-full rounded-2xl overflow-hidden mr-10">
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={100}
            alt="hero"
            sizes="(max-width: 430px) 100vw, 50vw"
          />
        </div>
        <div className="w-[900px] mr-10">
          <h1 className="text-secondarycolor font-bold text-3xl pb-1">{name}</h1>
          <p className="text-secondarycolor font-semibold min-w-14">{about}</p>
        </div>
        <div className="flex flex-col w-full h-full">
          <h1 className="text-secondarycolor font-bold mb-2">Interests:</h1>
          <div className="flex flex-wrap gap-2 mb-8">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="rounded-full bg-coolred text-secondarycolor h-7 px-2 flex items-center"
              >
                <span className="text-secondarycolor text-[0.8rem] font-sofia-pro">
                  {interest}
                </span>
              </div>
            ))}
          </div>
          <div className="mb-8">
            <h1 className="text-secondarycolor font-bold">Contact info:</h1>
            <p className="text-secondarycolor">{contact}</p>
          </div>
          <div>
            <button
              className="border-solid text-secondarycolor font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full mr-[0.7rem] font-sofia-pro hover:bg-coolredhl active:bg-coolreddrk"
              onClick={handleRequest} 
            >
              Request Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
