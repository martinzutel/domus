'use client'

import React from 'react';

interface InterestModalProps {
    children: React.ReactNode;
}

const InterestModal: React.FC<InterestModalProps> = ({ children }) => {
    return (
        <div >
            <div className='absolute flex items-center justify-center top-72'>
                <div className="absolute w-[500px] h-[500px] bg-gray-900 p-[20px] rounded-3xl flex flex-col items-center justify-center space-y-4 z-50">
                  {children}
                </div>
            </div>
          
        </div>
    );
};

export default InterestModal;
