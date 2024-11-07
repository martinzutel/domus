'use client';

import React, { useEffect } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';

interface MatchData {
  id: string;
  username: string; // Equivalent to "name"
  profileImage: string; // Equivalent to "image"
  matchDate: string;
  about: string; // New properties to match the user's profile structure
  contact: string;
  ownTags: string[];
}

interface MatchHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchData: MatchData[];
  onMatchClick: (user: MatchData) => void;
}

const MatchHistoryModal: React.FC<MatchHistoryModalProps> = ({
  isOpen,
  onClose,
  matchData,
  onMatchClick,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-39">
      <div className="relative bg-maincolor w-[90%] max-w-[500px] p-7 pt-4 rounded-3xl flex flex-col space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-coolred text-3xl"
        >
          <IoMdArrowRoundBack />
        </button>

        <h2 className="text-2xl font-semibold text-secondarycolor">Match History</h2>

        <div className="w-full max-h-[300px] overflow-y-auto space-y-3">
          {matchData.map((match) => (
            <div
              key={match.id}
              className="flex justify-between items-center p-3 bg-darkgre text-secondarycolor rounded-lg cursor-pointer"
              onClick={() => onMatchClick(match)} // Use entire match object
            >
              <img src={match.profileImage} alt={match.username} className="h-10 w-10 rounded-full" />
              <span className="font-medium">{match.username}</span>
              <span className="text-sm text-gray-400">{match.matchDate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchHistoryModal;
