'use client'
import React, { useState } from 'react';
import { BsFillPersonFill } from "react-icons/bs";

import InterestsForm from './interests/form';
import InterestModal from './interests/interestModal';

const Searchbar = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const toggleModal = (): void => {
        setIsModalOpen(!isModalOpen);
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
                    <BsFillPersonFill className='m-[10px]' />
                </button>
                <button className='h-full bg-darkgre text-4xl flex justify-center items-center text-coolred hover:bg-coolred hover:text-darkgre'>
                    <BsFillPersonFill className='m-[10px]' />
                </button>
                <button className='h-full bg-darkgre text-4xl flex justify-center items-center text-coolred hover:bg-coolred hover:text-darkgre rounded-r-full'>
                    <BsFillPersonFill className='ml-[5px] mr-[10px]' />
                </button>
            </div>

            {isModalOpen && (
                <InterestModal>
                    <div className="flex flex-col items-center space-y-4">
                        <InterestsForm closeModal={toggleModal} />
                        <button
                            onClick={toggleModal}
                            className="px-4 py-2 bg-red-500 text-white rounded"
                        >
                            Close Modal
                        </button>
                    </div>
                </InterestModal>
            )}
        </div>
    );
};

export default Searchbar;
