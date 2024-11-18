'use client';

import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/components/user-components/UserContext';
import ModalCard from '@/components/assets/ModalCard';

interface MatchData {
  id: string;
  username: string;
  profileImage: string;
  matchDate: string;
  about: string;
  contact: string;
  ownTags: string[];
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
  const { users } = useUserContext();
  const [matchData, setMatchData] = useState<MatchData[]>([]);

  useEffect(() => {
    if (users.length) {
      const matches = users.slice(0, 5).map((user) => ({
        id: user.id,
        username: user.name,
        profileImage: user.image,
        matchDate: new Date().toLocaleDateString(),
        about: user.about,
        contact: user.contact,
        ownTags: user.ownTags,
      }));

      setMatchData(matches);
    }
  }, [users]);

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
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-39"
      onClick={onClose}
    >
      <ModalCard title="Match History" onClose={onClose}>
        <div className="w-full max-h-[300px] overflow-y-auto space-y-3 mt-5">
          {matchData.map((match) => (
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
          ))}
        </div>
      </ModalCard>
    </div>
  );
};

export default MatchHistoryModal;
