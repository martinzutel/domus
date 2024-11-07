'use client';
import React, { useState } from 'react';
import CardGrid from "@/components/user-components/cardgrid";
import Intro from "@/components/sections/intro";
import Searchbar from "@/components/browse/searchbar";
import Topbar from "@/components/browse/topbar";
import Profile from "@/components/user-components/profile";
import MatchHistoryModal from "@/components/user-components/matchhistorymodal";
import InterestModal from "@/components/interests/interestModal";
import { UserProvider } from "@/components/user-components/UserContext";
import CheckboxGroup from "@/components/interests/CheckboxGroup";

const interests = [
  { value: "fitness", label: "Fitness" },
  { value: "football", label: "Football" },
  { value: "basketball", label: "Basketball" },
  { value: "tennis", label: "Tennis" },
  { value: "golf", label: "Golf" },
  { value: "hockey", label: "Hockey" },
  { value: "baseball", label: "Baseball" },
  { value: "rugby", label: "Rugby" },
  { value: "boxing", label: "Boxing" },
  { value: "skateboarding", label: "Skateboarding" },
  { value: "martial_arts", label: "Martial Arts" },
  { value: "reading", label: "Reading" },
  { value: "movies", label: "Movies" },
  { value: "gaming", label: "Gaming" },
  { value: "anime", label: "Anime" },
  { value: "photography", label: "Photography" },
  { value: "music", label: "Music" },
  { value: "writing", label: "Writing" },
  { value: "programming", label: "Programming" },
  { value: "hiking", label: "Hiking" },
  { value: "cooking", label: "Cooking" },
  { value: "gardening", label: "Gardening" },
  { value: "fishing", label: "Fishing" },
  { value: "eating", label: "Eating" },
  { value: "politics", label: "Politics" },
  { value: "musician", label: "Musician" },
];

export default function Home() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isMatchHistoryModalOpen, setIsMatchHistoryModalOpen] = useState(false);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

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

  const handleInterestSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Selected interests:", selectedInterests);
    setIsInterestModalOpen(false);
  };

  return (
    <UserProvider>
      <main>
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
            matchData={[
              {
                id: 1,
                username: "Alice",
                profileImage: "/images/images.jpg", // Placeholder image for Alice
                matchDate: "2024-10-25",
              },
              {
                id: 2,
                username: "Bob",
                profileImage: "/images/images.jpg", // Placeholder image for Bob
                matchDate: "2024-10-27",
              },
              {
                id: 3,
                username: "Charlie",
                profileImage: "/images/images.jpg", // Placeholder image for Charlie
                matchDate: "2024-10-30",
              },
              {
                id: 3,
                username: "Charlie",
                profileImage: "/images/images.jpg", // Placeholder image for Charlie
                matchDate: "2024-10-30",
              },
              {
                id: 4,
                username: "Charlie",
                profileImage: "/images/images.jpg", // Placeholder image for Charlie
                matchDate: "2024-10-30",
              },
            ]}
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
      </main>
    </UserProvider>
  );
}
