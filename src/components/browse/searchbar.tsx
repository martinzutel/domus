'use client';
import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { IoFilterCircle } from "react-icons/io5";
import NotificationModal from "@/components/user-components/notificationmodal";
import InterestModal from "@/components/interests/interestModal";
import CheckboxGroup from "@/components/interests/CheckboxGroup";

interface SearchbarProps {
  onToggleMatchHistory: () => void;
}

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

const Searchbar: React.FC<SearchbarProps> = ({ onToggleMatchHistory }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState<boolean>(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleModal = (): void => setIsModalOpen(!isModalOpen);
  const toggleNotificationModal = (): void => setIsNotificationModalOpen(!isNotificationModalOpen);

  const handleCheckedChange = (checkedValues: string[]): void => {
    setSelectedInterests(checkedValues);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Submitted interests: ", selectedInterests);
    toggleModal();
  };

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={toggleNotificationModal}
        className="h-[40px] bg-darkgre text-2xl mr-40 flex justify-center items-center text-coolred hover:bg-coolred hover:text-secondarycolor rounded-full"
      >
        <FaBell className="m-[16px]" />
      </button>

      <div className="h-[40px] w-[250px] flex justify-center items-center mr-40">
        <input
          type="text"
          placeholder="Search"
          className="h-full w-full bg-darkgre placeholder-secondarycolor outline-none rounded-l-full pl-4"
        />
        <button
          onClick={toggleModal}
          className="h-full bg-darkgre text-4xl flex justify-center items-center text-coolred hover:bg-coolred hover:text-secondarycolor rounded-r-full"
        >
          <IoFilterCircle className="m-[10px]" />
        </button>
      </div>

      <button
        onClick={onToggleMatchHistory}
        className="h-[40px] bg-darkgre text-2xl flex justify-center items-center text-coolred hover:bg-coolred hover:text-secondarycolor rounded-full"
      >
        Match History
      </button>

      {isNotificationModalOpen && (
        <NotificationModal onClose={toggleNotificationModal}>
          <p>This is a notification modal content.</p>
        </NotificationModal>
      )}

      {isModalOpen && (
        <InterestModal onClose={toggleModal}>
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl text-secondarycolor font-sofia-pro">
              Search through interests:
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
              <div className="max-h-[300px] overflow-y-auto">
                <CheckboxGroup interests={interests} onCheckedChange={handleCheckedChange} />
              </div>
              <button
                type="submit"
                className="border-solid text-secondarycolor font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full mt-auto mx-auto hover:bg-coolredhl active:bg-coolreddrk"
              >
                Submit
              </button>
            </form>
          </div>
        </InterestModal>
      )}
    </div>
  );
};

export default Searchbar;
