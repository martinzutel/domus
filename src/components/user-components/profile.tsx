'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import MatchHistoryModal from "@/components/user-components/matchhistorymodal";
import { RiCloseCircleFill } from 'react-icons/ri';

type ProfileProps = {
  id: string;
  name: string;
  about: string;
  image: string;
  interests: string[];
  contact: string;
  onClose: () => void;
};

const mockProfileMatches = [
  { id: 1, username: "User1", matchDate: "2024-10-28" },
  { id: 2, username: "User2", matchDate: "2024-10-30" },
];

const Profile: React.FC<ProfileProps> = ({
  id,
  name,
  about,
  image,
  interests,
  contact,
  onClose,
}) => {
  const [isMatchHistoryOpen, setIsMatchHistoryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const handleRequest = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setIsRequestSuccessful(false);

    try {
      const userRes = await fetch(`${baseUrl}/api/users/getUser`, {
        headers: {
          cookie: document.cookie,
        },
      });

      if (!userRes.ok) {
        throw new Error(`Error: ${userRes.status} ${userRes.statusText}`);
      }

      const userData = await userRes.json();
      const requesterId = userData.id;
      const receiverId = id;

      console.log(`Match request sent to ${name}`, requesterId, receiverId);

      const matchRes = await fetch(`${baseUrl}/api/match/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: document.cookie,
        },
        body: JSON.stringify({
          requesterId,
          receiverId,
        }),
      });

      if (!matchRes.ok) {
        throw new Error(`Error: ${matchRes.status} ${matchRes.statusText}`);
      }

      setIsRequestSuccessful(true);
      console.log("Match created successfully");
    } catch (error) {
      setErrorMessage("Failed to send match request. Please try again.");
      console.error("Failed to create match:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="h-[500px] w-[1080px] bg-maincolor border-secondarycolor rounded-3xl flex flex-row p-6 relative">
        <button
          className="absolute top-4 right-4 text-coolred text-3xl"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <RiCloseCircleFill />
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
          <div className="flex flex-col space-y-4">
            <button
              className="border-solid text-secondarycolor font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full font-sofia-pro hover:bg-coolredhl active:bg-coolreddrk"
              onClick={() => setIsMatchHistoryOpen(true)}
            >
              View Match History
            </button>
            <button
              className="border-solid text-secondarycolor font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full font-sofia-pro hover:bg-coolredhl active:bg-coolreddrk"
              onClick={handleRequest}
              disabled={isLoading || isRequestSuccessful}
            >
              {isLoading ? "Sending..." : isRequestSuccessful ? "Request Sent" : "Request Match"}
            </button>
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>

      {isMatchHistoryOpen && (
        <MatchHistoryModal
          isOpen={isMatchHistoryOpen}
          onClose={() => setIsMatchHistoryOpen(false)}
          matchData={mockProfileMatches}
        />
      )}
    </div>
  );
};

export default Profile;
