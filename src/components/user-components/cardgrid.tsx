'use client';

import React from 'react';
import CardComponent from '@/components/user-components/cardcomponent';

type User = {
  id: string;
  name: string;
  about: string;
  image: string;
  ownTags: string[];
  contact: string;
};

type CardGridProps = {
  users: User[];
  onCardClick: (user: User) => void;
};

const CardGrid: React.FC<CardGridProps> = ({ users, onCardClick }) => {
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
