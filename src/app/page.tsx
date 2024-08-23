'use client'
import React, { useState, useEffect } from 'react';
import CardGrid from "@/components/user-components/cardgrid";
import Intro from "@/components/sections/intro";
import Searchbar from "@/components/searchbar";
import Topbar from "@/components/topbar";
import Profile from "@/components/user-components/profile";
import { UserProvider } from "@/components/UserContext";

export default function Home() {
  
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [userProfile, setUserProfile] = useState<{
    id: string;
    name: string;
    about: string;
    image: string;
    ownTags: string[];
    contact: string;
  } | null>(null);

  const handleCardClick = async (userId: string) => {

    setSelectedUserId(userId);
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await fetch('/api/users/getUserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
  
      const data = await response.json();
  
      setUserProfile({
        id: data.id,
        name: data.name,
        about: data.about,
        image: data.image,
        ownTags: data.ownTags.map((tag: { tagValue: any; }) => tag.tagValue),
        contact: data.contact,
      });

      console.log(data);

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
          <Searchbar />
        </Topbar>

        <Intro />
        
        <CardGrid onCardClick={(user) => handleCardClick(user.id)} />

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg">
              <p>Loading...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg">
              <p>{error}</p>
              <button onClick={() => setError(null)}>Close</button>
            </div>
          </div>
        )}
    
        {userProfile && !isLoading && !error && (

          console.log(userProfile.ownTags),
          
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

      </main>
    </UserProvider>
  );
}
