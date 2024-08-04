'use client';
import React, { useState } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import { IoFilterCircle } from "react-icons/io5";

import CheckboxGroup from './interests/CheckboxGroup';
import InterestModal from './interests/interestModal';
import { User } from 'next-auth';

interface Interest {
    value: string;
    label: string;
}

const interests: Interest[] = [

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
    { value: "musician", label: "Musician" }
    
];

const Searchbar = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [data, setData] = useState<User[]>([]);
    

    const toggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCheckedChange = (checkedValues: string[]) => {
        setSelectedInterests(checkedValues);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {

            const response = await fetch('/api/tagSearch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchTags: selectedInterests }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result: User[] = await response.json();

            setData(result);       

            console.log('Successfully submitted interests');

            toggleModal(); 

        } catch (error) {

            console.error("Error submitting interests:", error);

        }
    };

    return (

        <div className='w-full flex flex-col justify-center items-center'>

            <div className='h-[40px] w-[350px] flex justify-center items-center '>

                <input
                    type="text"
                    placeholder='Search'
                    className='h-full w-full bg-darkgre placeholder-white outline-none rounded-l-full pl-4'
                />

                <button
                    onClick={toggleModal}
                    className='h-full bg-darkgre text-4xl flex justify-center items-center text-coolred hover:bg-coolred hover:text-darkgre'
                >
                    <IoFilterCircle className='m-[10px]' />
                </button>

                <button className='h-full bg-darkgre text-4xl flex justify-center items-center text-coolred hover:bg-coolred hover:text-darkgre'>
                    <BsFillPersonFill className='m-[10px]' />
                </button>

                <button className='h-full bg-darkgre text-4xl flex justify-center items-center text-coolred hover:bg-coolred hover:text-darkgre rounded-r-full'>
                    <BsFillPersonFill className='ml-[5px] mr-[10px]' />
                </button>

            </div>

            {isModalOpen && (

                <InterestModal onClose={toggleModal}>

                    <div className="flex flex-col items-center space-y-4">
                       
                        <h1 className='text-4xl text-white font-sofia-pro'>
                            Search through interests:
                        </h1>

                        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">

                            <div className='max-h-[300px] overflow-y-auto'>
                                <CheckboxGroup interests={interests} onCheckedChange={handleCheckedChange} />
                            </div>
                          
                            <button
                                type="submit"
                                className="border-solid text-darkgre font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full mt-auto mx-auto hover:bg-coolredhl active:bg-coolreddrk"
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
