'use client';

import React from 'react';
import { FaBell } from 'react-icons/fa';
import { IoFilterCircle } from 'react-icons/io5';
import { GoClockFill } from 'react-icons/go';

interface SearchbarProps {
  onToggleNotificationModal: () => void;
  onToggleMatchHistory: () => void;
  onToggleInterestModal: () => void;
}

const Searchbar: React.FC<SearchbarProps> = ({
  onToggleNotificationModal,
  onToggleMatchHistory,
  onToggleInterestModal,
}) => {
  return (
    <div className="w-full flex justify-center items-center">
      <button
        onClick={onToggleNotificationModal}
        className="h-[40px] bg-darkgre text-2xl flex justify-center items-center text-coolred hover:bg-coolred hover:text-secondarycolor rounded-full"
      >
        <FaBell className="m-[16px]" />
      </button>

      <div className="h-[40px] w-[250px] flex justify-center items-center relative mx-[40px]">
        <input
          type="text"
          placeholder="Search"
          className="h-full w-full bg-darkgre placeholder-secondarycolor outline-none rounded-l-full pl-4"
        />
        <button
          onClick={onToggleInterestModal}
          className="h-full bg-darkgre text-4xl flex justify-center items-center text-coolred hover:bg-coolred hover:text-secondarycolor rounded-r-full"
        >
          <IoFilterCircle className="m-[10px]" />
        </button>
      </div>

      <button
        onClick={onToggleMatchHistory}
        className="h-[40px] bg-darkgre text-2xl flex justify-center items-center text-coolred hover:bg-coolred hover:text-secondarycolor rounded-full"
      >
        <GoClockFill className="m-[16px]" />
      </button>
    </div>
  );
};

export default Searchbar;
