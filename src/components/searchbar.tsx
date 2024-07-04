'use client'
import React, { useState } from 'react';
import { BsFillPersonFill } from "react-icons/bs";

import InterestsForm from './interests/form';
import InterestModal from './interests/interestModal';
import { RxCross2 } from "react-icons/rx";

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
                        <div className='w-full'>
                            <button
                                onClick={toggleModal}
                                className="top-0 left-0 px-4 py-2 text-coolred text-3xl rounded"
                            >
                                <RxCross2 />
                            </button>
                        </div>
                       

                        <h1 className='text-4xl text-white font-sofia-pro'
                        >Search through interests:</h1>
                        
                        <InterestsForm 
                        closeModal={toggleModal} 
                        modalContext="search" 
                        />
                       
                    </div>
                </InterestModal>
            )}
        </div>
    );
};

export default Searchbar;
