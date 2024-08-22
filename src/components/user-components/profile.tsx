'use client'
import React from 'react';
import Image from 'next/image';

type ProfileProps = {
  id: string;
  name: string;
  about: string;
  image: string;
  interests: string[];
  onClose: () => void;
};

const Profile: React.FC<ProfileProps> = ({ name, about, image, interests, onClose }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="h-[500px] w-[1080px] bg-maincolor border-white border-solid border rounded-3xl flex flex-row p-10 relative">
        <button className="left-0 top-0 text-white absolute mt-4 ml-4" onClick={onClose}>
          X
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
          <h1 className="text-white font-bold text-3xl pb-1">{name}</h1>
          <p className="text-white font-semibold min-w-14">{about}</p>
        </div>
        <div className="flex flex-col w-full h-full">
          <h1 className="text-white font-bold mb-2">Interests:</h1>
          <div className="flex flex-wrap gap-2 mb-8">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="rounded-full bg-coolred text-secondarycolor h-7 px-2 flex items-center"
              >
                <span className="text-white text-[0.8rem] font-sofia-pro">
                  {interest}
                </span>
              </div>
            ))}
          </div>
          <div className="mb-8">
            <h1 className="text-white font-bold">Contact info:</h1>
            <p className="text-white">number: 11 3378172</p>
          </div>
          <div>
            <button className="border-solid text-darkgre font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full mr-[0.7rem] font-sofia-pro hover:bg-coolredhl active:bg-coolreddrk">
              request match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
