'use client';

import React, { useEffect, useState } from 'react';
import ModalCard from '@/components/assets/ModalCard';
import UserItem from '@/components/user-components/useritem';
import Profile from '@/components/user-components/profile';

interface MatchData {
  id: string;
  username: string;
  profileImage: string;
  matchDate: string;
  about: string;
  contact: string;
  ownTags: { tagName: string; tagId: string; tagValue: string }[];
}

interface MatchHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string | null; // Allow null explicitly
}


const MatchHistoryModal: React.FC<MatchHistoryModalProps> = ({
  isOpen,
  onClose,
  userId, // Accept userId as a prop
}) => {
  const [matchData, setMatchData] = useState<MatchData[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<MatchData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchHistory = async () => {
      if (!isOpen || matchData.length > 0) return; // Prevent refetching if data is already loaded

      setLoading(true);
      setError(null); // Reset error before fetching

      try {
        // Construct the API endpoint, passing userId if specified
        const apiUrl = userId
          ? `/api/match/getNotifs?userId=${userId}`
          : '/api/match/getNotifs';

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch match history: ${response.statusText}`);
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
      } catch (error: any) {
        console.error('Error fetching match history:', error);
        setError(error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchHistory();
  }, [isOpen, userId, matchData.length]);

  const handleOpenProfile = (match: MatchData) => {
    setSelectedProfile(match);
  };

  const handleCloseProfile = () => {
    setSelectedProfile(null);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
        <ModalCard title="Match History" onClose={onClose}>
          <div className="w-full max-h-[300px] overflow-y-auto space-y-3">
            {loading && <p className="text-secondarycolor">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && matchData.length > 0 ? (
              matchData.map((match) => (
                <UserItem
                  key={match.id}
                  profileImage={match.profileImage}
                  username={match.username}
                  rightContent={<span className="text-sm text-gray-400">{match.matchDate}</span>}
                  onClick={() => handleOpenProfile(match)}
                />
              ))
            ) : (
              !loading && !error && <p className="text-secondarycolor">No matches found.</p>
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
          interests={selectedProfile.ownTags.map((tag) => tag.tagName)}
          contact={selectedProfile.contact}
          onClose={handleCloseProfile}
        />
      )}
    </>
  );
};

export default MatchHistoryModal;
