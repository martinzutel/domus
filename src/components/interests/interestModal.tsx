'use client'

import React from 'react';
import { useEffect } from 'react';

interface InterestModalProps {
    children: React.ReactNode;
}

const InterestModal: React.FC<InterestModalProps> = ({ children }) => {
    
    useEffect(() => {
        // Add the class to the body to block scrolling
        document.body.classList.add('overflow-hidden');
        
        // Cleanup function to remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    return (
        
        <>
            <div className='fixed h-screen w-screen bg-black opacity-40 z-40 top-0 left-0 backdrop-blur-xl'></div>

            <div>

                <div className='absolute flex items-center justify-center top-72'>
                    <div className="absolute w-[500px] h-[500px] bg-black p-[20px] rounded-3xl flex flex-col items-center justify-center space-y-4 z-50">
                    {children}
                    </div>
                </div>
            
            </div>
        </>
       
    );
};

export default InterestModal;
