'use client'
import React, { useEffect, useState } from 'react';
import CardComponent from '@/components/user-components/cardcomponent';
import { useUserContext } from '@/components/user-components/UserContext';


type user = {
  id: string;
  name: string;
  about: string;
  image: string;
  ownTags: string[];
  contact: string;
};

type CardGridProps = {
  onCardClick: (user: user) => void;
};

const CardGrid: React.FC<CardGridProps> = ({ onCardClick }) => {
  
  const { users, setUsers } = useUserContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users/getAllUsers');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const result = await response.json();

        const updatedResult = result.map((user: any) => {
          const interestsArray = user.ownTags.map((tag: string) => 
            tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase().replace(/_/g, ' ')
          );
          return {
            ...user,
            ownTags: interestsArray,
          };
        });

        setUsers(updatedResult);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };

    fetchData();
  }, [setUsers]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="font-sofia-pro font-bold text-secondarycolor text-center">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="font-sofia-pro font-bold text-red-500 text-center">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap gap-[40px] bg-maincolor w-[1500px] justify-center mt-[120px]">
        {users.map((user) => (
          <CardComponent
            key={user.id}
            id={user.id}
            name={user.name}
            about={user.about}
            image={user.image}
            interests={user.ownTags}
            contact={user.contact} 
            onClick={() => onCardClick(user)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
