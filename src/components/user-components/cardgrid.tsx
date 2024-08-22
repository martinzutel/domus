'use client'
import React, { useEffect, useState } from 'react';
import CardComponent from '@/components/user-components/cardcomponent';
import { useUserContext } from '@/components/UserContext';

type CardGridProps = {
  onCardClick: (user: {
    id: string;
    name: string;
    about: string;
    image: string;
    ownTags: string[];
  }) => void;
};

const CardGrid: React.FC<CardGridProps> = ({ onCardClick }) => {
  const { users, setUsers } = useUserContext();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users/getAllUsers');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const result = await response.json();

        const updatedResult = result.map((user: any) => {
          const interestsArray = user.ownTags.map((tag: string) => {
            return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase().replace(/_/g, ' ');
          });
          return {
            ...user,
            ownTags: interestsArray,
          };
        });

        setUsers(updatedResult);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [setUsers]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (users.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p className="font-sofia-pro font-bold text text-white text-center sm:text-center">
          Loading...
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
            onClick={() => onCardClick(user)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
