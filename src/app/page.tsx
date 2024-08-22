'use client'
import React, { useState } from 'react';
import CardGrid from "@/components/user-components/cardgrid";
import Intro from "@/components/sections/intro";
import Searchbar from "@/components/searchbar";
import Topbar from "@/components/topbar";
import Profile from "@/components/user-components/profile";
import { UserProvider } from "@/components/UserContext";

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
    about: string;
    image: string;
    ownTags: string[];
  } | null>(null);

  const handleCardClick = (user: {
    id: string;
    name: string;
    about: string;
    image: string;
    ownTags: string[];
  }) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <UserProvider>
      <main>
        <Topbar>
          <Searchbar />
        </Topbar>
        <Intro />
        <CardGrid onCardClick={handleCardClick} />
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Profile
              id={selectedUser.id}
              name={selectedUser.name}
              about={selectedUser.about}
              image={selectedUser.image}
              interests={selectedUser.ownTags}
              onClose={closeModal}
            />
          </div>
        )}
      </main>
    </UserProvider>
  );
}
