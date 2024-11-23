'use client';

import React, { useEffect, useState } from 'react';
import ModalCard from '@/components/assets/ModalCard';
import UserItem from '@/components/user-components/useritem';
import Profile from '@/components/user-components/profile'; // Import Profile component

interface MatchData {
  id: string;
  username: string;
  profileImage: string;
  matchDate: string;
  about: string;
  contact: string;
  ownTags: { tagName: string; tagId: string; tagValue: string }[]; // Ensure ownTags has a default structure
}

interface MatchHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MatchHistoryModal: React.FC<MatchHistoryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [matchData, setMatchData] = useState<MatchData[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<MatchData | null>(null); // Track selected profile

  useEffect(() => {
    if (isOpen) {
      const fetchAcceptedMatches = async () => {
        try {
          const response = await fetch('/api/match/getNotifs');
          if (!response.ok) {
            throw new Error(`Failed to fetch accepted matches: ${response.statusText}`);
          }

          const data = await response.json();
          const acceptedMatches = data.acceptedDenied
            .filter((match: any) => match.status === 'accepted')
            .map((match: any) => ({
              id: match.id,
              username: match.requester.name,
              profileImage: match.requester.image,
              matchDate: new Date(match.updatedAt).toLocaleDateString(),
              about: match.requester.about || 'No about information',
              contact: match.requester.contact || 'No contact info',
              ownTags: match.requester.ownTags || [], // Default to an empty array
            }));

          setMatchData(acceptedMatches);
        } catch (error) {
          console.error('Error fetching accepted matches:', error);
        }
      };

      fetchAcceptedMatches();
    }
  }, [isOpen]);

  const handleOpenProfile = (match: MatchData) => {
    setSelectedProfile(match); // Open the profile modal with the selected user's data
  };

  const handleCloseProfile = () => {
    setSelectedProfile(null); // Close the profile modal
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
        <ModalCard title="Match History" onClose={onClose}>
          <div className="w-full max-h-[300px] overflow-y-auto space-y-3">
            {matchData.length > 0 ? (
              matchData.map((match) => (
                <UserItem
                  key={match.id}
                  profileImage={match.profileImage}
                  username={match.username}
                  rightContent={<span className="text-sm text-gray-400">{match.matchDate}</span>}
                  onClick={() => handleOpenProfile(match)} // Open profile when clicking the card
                />
              ))
            ) : (
              <p className="text-secondarycolor">No matches found.</p>
            )}
          </div>
        </ModalCard>
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <Profile
          id={selectedProfile.id}
          name={selectedProfile.username}
          about={selectedProfile.about}
          image={selectedProfile.profileImage}
          interests={selectedProfile.ownTags.map((tag) => tag.tagName)} // Safely map interests
          contact={selectedProfile.contact}
          onClose={handleCloseProfile} // Close the profile modal
        />
      )}
    </>
  );
};

export default MatchHistoryModal;
