'use client';

import React, { useState, useEffect } from 'react';
import CardGrid from "@/components/user-components/cardgrid";
import Intro from "@/components/sections/intro";
import Searchbar from "@/components/browse/searchbar";
import Topbar from "@/components/browse/topbar";
import Profile from "@/components/user-components/profile";
import MatchHistoryModal from "@/components/user-components/matchhistorymodal";
import NotificationModal from "@/components/user-components/notificationmodal";
import InterestModal from "@/components/interests/interestModal";
import { UserProvider, useUserContext } from "@/components/user-components/UserContext";
import { ModalProvider, useModalContext } from "@/components/contexts/ModalContext";
import CheckboxGroup from '@/components/interests/CheckboxGroup';

const HomeContent: React.FC = () => {
  const { activeModal, openModal, closeModal } = useModalContext();
  const { users, setUsers } = useUserContext();
  const [selectedProfile, setSelectedProfile] = useState<null | {
    id: string;
    name: string;
    about: string;
    image: string;
    ownTags: string[];
    contact: string;
  }>(null);
  const [matchHistoryData, setMatchHistoryData] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users/getAllUsers');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
        setMatchHistoryData(data.slice(0, 5)); // Load some users for match history
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [setUsers]);

  return (
    <>
      <Topbar>
        <Searchbar
          onToggleNotificationModal={() => openModal("notification")}
          onToggleMatchHistory={() => openModal("matchHistory")}
          onToggleInterestModal={() => openModal("interest")}
        />
      </Topbar>

      <Intro />
      <CardGrid onCardClick={(user) => setSelectedProfile(user)} />

      {selectedProfile && (
        <Profile
          id={selectedProfile.id}
          name={selectedProfile.name}
          about={selectedProfile.about}
          image={selectedProfile.image}
          interests={selectedProfile.ownTags}
          contact={selectedProfile.contact}
          onClose={() => setSelectedProfile(null)}
          onViewMatchHistory={() => openModal("matchHistory")}
        />
      )}

      {activeModal === "notification" && (
        <NotificationModal onClose={closeModal} />
      )}

      {activeModal === "matchHistory" && (
        <MatchHistoryModal
          isOpen={true}
          onClose={closeModal}
          onMatchClick={(user) => console.log("Selected match:", user)}
          matchData={matchHistoryData}
        />
      )}

      {activeModal === "interest" && (
        <InterestModal onClose={closeModal}>
          <form className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl text-secondarycolor font-sofia-pro">
              Search through interests:
            </h1>
            <div className="max-h-[300px] overflow-y-auto">
              {/* Assume CheckboxGroup is properly implemented */}
              <CheckboxGroup
                interests={[
                  { value: "fitness", label: "Fitness" },
                  { value: "football", label: "Football" },
                  { value: "basketball", label: "Basketball" },
                  { value: "tennis", label: "Tennis" },
                  { value: "golf", label: "Golf" },
                ]}
                onCheckedChange={() => {}} // Placeholder function
              />
            </div>
            <button
              type="submit"
              className="bg-coolred text-white py-2 px-6 rounded-full hover:bg-coolredhl"
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
      <ModalProvider>
        <HomeContent />
      </ModalProvider>
    </UserProvider>
  );
};

export default Home;
