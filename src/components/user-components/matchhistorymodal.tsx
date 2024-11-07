'use client';

import React, { useEffect } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Image from 'next/image';

interface MatchData {
  id: number;
  username: string;
  profileImage: string; // Add profileImage field
  matchDate: string;
}

interface MatchHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchData: MatchData[];
}

const MatchHistoryModal: React.FC<MatchHistoryModalProps> = ({ isOpen, onClose, matchData }) => {
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[50px]">
      {/* Background overlay */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close Modal"
      ></div>

      {/* Modal content */}
      <div className="relative bg-maincolor w-[90%] max-w-[500px] p-7 pt-4 rounded-3xl flex flex-col space-y-4 mb-2">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-coolred text-3xl"
          aria-label="Close Modal"
        >
          <IoMdArrowRoundBack />
        </button>

        <h2 className="text-2xl font-semibold text-secondarycolor mt-[50px]">Match History</h2>

        {/* Scrollable Match List */}
        <div className="w-full max-h-[300px] overflow-y-auto space-y-3">
          {matchData.map((match) => (
            <div
              key={match.id}
              className="flex items-center justify-between p-3 bg-darkgre text-secondarycolor rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={match.profileImage}
                  alt={`${match.username}'s profile`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="font-medium">{match.username}</span>
              </div>
              <span className="text-sm text-gray-400">{match.matchDate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchHistoryModal;
