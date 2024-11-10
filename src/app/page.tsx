'use client';

import React, { useState, useEffect } from 'react';
import CardGrid from "@/components/user-components/cardgrid";
import Intro from "@/components/sections/intro";
import Searchbar from "@/components/browse/searchbar";
import Topbar from "@/components/browse/topbar";
import Profile from "@/components/user-components/profile";
import MatchHistoryModal from "@/components/user-components/matchhistorymodal";
import InterestModal from "@/components/interests/interestModal";
import { UserProvider, useUserContext } from "@/components/user-components/UserContext";
import CheckboxGroup from "@/components/interests/CheckboxGroup";

const interests = [
  { value: "fitness", label: "Fitness" },
  { value: "football", label: "Football" },
  // ... other predefined interests
];

const HomeContent: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isMatchHistoryModalOpen, setIsMatchHistoryModalOpen] = useState(false);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const { users, setUsers } = useUserContext();

  const [userProfile, setUserProfile] = useState<{
    id: string;
    name: string;
    about: string;
    image: string;
    ownTags: string[];
    contact: string;
  } | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users/getAllUsers');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchUsers();
  }, [setUsers]);

  const handleCardClick = (user: {
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
      setUserProfile(user);
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

  const handleInterestSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Selected interests:", selectedInterests);
    setIsInterestModalOpen(false);
  };

  return (
    <>
      <Topbar>
        <Searchbar
          onToggleMatchHistory={() => setIsMatchHistoryModalOpen(true)}
          onToggleInterestModal={() => setIsInterestModalOpen(true)}
        />
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
          onMatchClick={(match) =>
            handleCardClick({
              id: match.id,
              name: match.username,
              about: match.about,
              image: match.profileImage,
              contact: match.contact,
              ownTags: match.ownTags,
            })
          }
        />
      )}

      {isInterestModalOpen && (
        <InterestModal onClose={() => setIsInterestModalOpen(false)}>
          <form onSubmit={handleInterestSubmit} className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl text-secondarycolor font-sofia-pro">
              Search through interests:
            </h1>
            <div className="max-h-[300px] overflow-y-auto">
              <CheckboxGroup
                interests={interests}
                onCheckedChange={setSelectedInterests}
              />
            </div>
            <button
              type="submit"
              className="border-solid text-secondarycolor font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full mt-auto mx-auto hover:bg-coolredhl active:bg-coolreddrk"
            >
              Submit
            </button>
          </form>
        </InterestModal>
      )}
    </>
  );
};

const Home: React.FC = () => {
  return (
    <UserProvider>
      <HomeContent />
    </UserProvider>
  );
};

export default Home;
