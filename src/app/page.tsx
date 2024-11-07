'use client';
import React, { useState } from 'react';
import CardGrid from "@/components/user-components/cardgrid";
import Intro from "@/components/sections/intro";
import Searchbar from "@/components/browse/searchbar";
import Topbar from "@/components/browse/topbar";
import Profile from "@/components/user-components/profile";
import MatchHistoryModal from "@/components/user-components/matchhistorymodal";
import { UserProvider } from "@/components/user-components/UserContext";

export default function Home() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isMatchHistoryModalOpen, setIsMatchHistoryModalOpen] = useState(false);

  const [userProfile, setUserProfile] = useState<{
    id: string;
    name: string;
    about: string;
    image: string;
    ownTags: string[];
    contact: string;
  } | null>(null);

  const handleCardClick = async (user: {
    id: string;
    name: string;
    about: string;
    image: string;
    contact: string;
    ownTags: string[];
  }) => {
    setSelectedUserId(user.id);
    setIsLoading(true);
    setError(null);

    try {
      setUserProfile({
        id: user.id,
        name: user.name,
        about: user.about,
        image: user.image,
        ownTags: user.ownTags,
        contact: user.contact,
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setError('Failed to fetch user profile');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setUserProfile(null);
  };

  return (
    <UserProvider>
      <main>
        <Topbar>
          <Searchbar onToggleMatchHistory={() => setIsMatchHistoryModalOpen(true)} />
        </Topbar>

        <Intro />
        <CardGrid onCardClick={(user) => handleCardClick(user)} />

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-secondarycolor p-4 rounded-lg">
              <p>Loading...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-secondarycolor p-4 rounded-lg">
              <p>{error}</p>
              <button onClick={() => setError(null)}>Close</button>
            </div>
          </div>
        )}

        {userProfile && !isLoading && !error && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Profile
              id={userProfile.id}
              name={userProfile.name}
              about={userProfile.about}
              image={userProfile.image}
              interests={userProfile.ownTags}
              contact={userProfile.contact}
              onClose={closeModal}
            />
          </div>
        )}

        {isMatchHistoryModalOpen && (
          <MatchHistoryModal
            isOpen={isMatchHistoryModalOpen}
            onClose={() => setIsMatchHistoryModalOpen(false)}
            matchData={[
              { id: 1, username: "Alice", matchDate: "2024-10-25" },
              { id: 2, username: "Bob", matchDate: "2024-10-27" },
              { id: 3, username: "Charlie", matchDate: "2024-10-30" },
            ]}
          />
        )}
      </main>
    </UserProvider>
  );
}
