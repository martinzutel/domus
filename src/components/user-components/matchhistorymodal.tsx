import React from 'react';

interface MatchData {
  id: number;
  username: string;
  matchDate: string;
}

interface MatchHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchData: MatchData[];
}

const MatchHistoryModal: React.FC<MatchHistoryModalProps> = ({ isOpen, onClose, matchData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Match History</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="space-y-3">
          {matchData.map((match) => (
            <div
              key={match.id}
              className="flex justify-between items-center p-3 bg-gray-100 rounded-lg"
            >
              <span className="font-medium text-gray-800">{match.username}</span>
              <span className="text-sm text-gray-500">{match.matchDate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchHistoryModal;
