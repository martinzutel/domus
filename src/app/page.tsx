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
  const [filters, setFilters] = useState<string[]>([]);
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users/getAllUsers');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data); // Initially show all users
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [setUsers]);

  useEffect(() => {
    if (filters.length === 0) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          filters.some((filter) => user.ownTags.includes(filter))
        )
      );
    }
  }, [filters, users]);

  const handleProfileClose = () => {
    setSelectedProfile(null);
  };

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
      <CardGrid onCardClick={(user) => setSelectedProfile(user)} users={filteredUsers} />

      {selectedProfile && (
        <Profile
          id={selectedProfile.id}
          name={selectedProfile.name}
          about={selectedProfile.about}
          image={selectedProfile.image}
          interests={selectedProfile.ownTags}
          contact={selectedProfile.contact}
          onClose={handleProfileClose}
          onOpenMatchHistory={openModal} // Pass openModal directly
        />
      )}

      {activeModal === "notification" && (
        <NotificationModal onClose={closeModal} />
      )}

      {activeModal === "matchHistory" && (
        <MatchHistoryModal
          isOpen={true}
          onClose={closeModal}
        />
      )}

      {activeModal === "interest" && (
        <InterestModal
          onClose={closeModal}
          onApplyFilters={(selectedFilters) => {
            setFilters(selectedFilters);
            closeModal();
          }}
        />
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
