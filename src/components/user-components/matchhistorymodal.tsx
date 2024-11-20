'use client';

import React, { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';

interface MatchData {
  id: string;
  username: string;
  profileImage: string;
  matchDate: string;
  about: string;
  contact: string;
  ownTags?: string[]; // Optional since it wasn't in the example response
}

interface MatchHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMatchClick: (user: MatchData) => void;
}

const MatchHistoryModal: React.FC<MatchHistoryModalProps> = ({
  isOpen,
  onClose,
  onMatchClick,
}) => {
  const [matchData, setMatchData] = useState<MatchData[]>([]);

  useEffect(() => {
    if (isOpen) {
      console.log('Modal is open, fetching accepted matches...');
      const fetchAcceptedMatches = async () => {
        try {
          const response = await fetch('/api/match/getNotifs');
          console.log('Raw API Response:', response);

          if (!response.ok) {
            throw new Error(`Failed to fetch accepted matches: ${response.statusText}`);
          }

          const data = await response.json();
          console.log('Parsed API Data:', data);

          // Filter and map accepted matches
          const acceptedMatches = data.acceptedDenied
            .filter((match: any) => match.status === 'accepted')
            .map((match: any) => ({
              id: match.id,
              username: match.requester.name,
              profileImage: match.requester.image,
              matchDate: new Date(match.updatedAt).toLocaleDateString(),
              about: match.requester.about || "No about information",
              contact: match.requester.contact || "No contact info",
            }));

          console.log('Formatted Match Data:', acceptedMatches);
          setMatchData(acceptedMatches);
        } catch (error) {
          console.error('Error fetching accepted matches:', error);
        }
      };

      fetchAcceptedMatches();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-39"
      onClick={onClose}
    >
      <div
        className="relative bg-maincolor w-[90%] max-w-[500px] p-7 pt-4 rounded-3xl flex flex-col space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-coolred text-3xl"
        >
          <IoMdArrowRoundBack />
        </button>

        <h2 className="text-2xl font-semibold text-secondarycolor">Match History</h2>

        <div className="w-full max-h-[300px] overflow-y-auto space-y-3">
          {matchData.length > 0 ? (
            matchData.map((match) => (
              <div
                key={match.id}
                className="flex justify-between items-center p-3 bg-darkgre text-secondarycolor rounded-lg cursor-pointer"
                onClick={() => onMatchClick(match)}
              >
                <img
                  src={match.profileImage}
                  alt={match.username}
                  className="h-10 w-10 rounded-full"
                />
                <span className="font-medium">{match.username}</span>
                <span className="text-sm text-gray-400">{match.matchDate}</span>
              </div>
            ))
          ) : (
            <p className="text-secondarycolor">No matches found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchHistoryModal;
