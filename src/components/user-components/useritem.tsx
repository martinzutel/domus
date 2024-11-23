'use client';

import React from 'react';

interface UserItemProps {
  profileImage: string;
  username: string;
  rightContent: React.ReactNode; // Customizable right-side content
  onClick?: () => void; // Optional for clickable rows (profile opening)
}

const UserItem: React.FC<UserItemProps> = ({
  profileImage,
  username,
  rightContent,
  onClick,
}) => {
  return (
    <div
      className={`flex justify-between items-center p-3 bg-maincolor text-secondarycolor rounded-lg ${
        onClick ? 'cursor-pointer hover:bg-gray-700 transition' : ''
      }`}
      onClick={onClick}
    >
      <img
        src={profileImage}
        alt={username}
        className="h-10 w-10 rounded-full object-cover"
      />
      <span className="font-medium truncate ml-3">{username}</span>
      <div className="flex items-center ml-auto">{rightContent}</div>
    </div>
  );
};

export default UserItem;
