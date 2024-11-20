'use client';
import React, { useState } from 'react';

type MatchRequestProps = {
  username: string;
  profileImage: string;
  onAccept: () => void;
  onDeny: () => void;
};

const MatchRequest: React.FC<MatchRequestProps> = ({ username, profileImage, onAccept, onDeny }) => {
  const [isDenyPressed, setIsDenyPressed] = useState(false);

  const handleDenyMouseDown = () => setIsDenyPressed(true);
  const handleDenyMouseUp = () => {
    setIsDenyPressed(false);
    onDeny();
  };

  return (
    <div className="flex items-center justify-between p-4 bg-darkgray rounded-lg">
      <div className="flex items-center">
        <img src={profileImage} alt={`${username}'s profile`} className="w-10 h-10 rounded-full mr-3" />
        <span className="text-white">{`Match request by ${username}`}</span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onAccept}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg transition duration-150 ease-in-out hover:bg-orange-600 active:bg-orange-700 focus:outline-none"
        >
          Accept
        </button>
        <button
          onMouseDown={handleDenyMouseDown}
          onMouseUp={handleDenyMouseUp}
          onMouseLeave={() => setIsDenyPressed(false)}
          className={`bg-gray-500 text-white px-4 py-2 rounded-lg transition duration-150 ease-in-out hover:bg-gray-600 active:bg-gray-700 focus:outline-none`}
        >
          Deny
        </button>
      </div>
    </div>
  );
};

export default MatchRequest;
