'use client'

import React from 'react';
import { useEffect, ReactNode } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';

interface InterestModalProps {
    children: ReactNode;
    onClose: () => void;  // Added onClose prop to handle the close action
}

const InterestModal: React.FC<InterestModalProps> = ({ children, onClose }) => {
    
    useEffect(() => {
       
        document.body.classList.add('overflow-hidden');
 
        return () => {
            document.body.classList.remove('overflow-hidden');
        };

    }, []);

    return (
        
        <>
            <div>
                
                <div
                    className='fixed h-screen w-screen bg-black/50 top-0 left-0 '
                    onClick={onClose}
                >
                    
                </div>

                <div
                    className='absolute flex items-center justify-center top-[400px]'
                >
                    <div className="absolute bg-maincolor min-w-[500px] p-7 pt-4 rounded-3xl flex flex-col items-center justify-center space-y-4 z-50">

                        <button 
                            onClick={onClose}  // Close modal when clicking the 'X' button
                            className='absolute top-4 left-4 text-coolred text-3xl'
                            aria-label="Close Modal"  // Added aria-label for accessibility
                        >
                            <IoMdArrowRoundBack />
                        </button>

                        {children}

                    </div>

                </div>
            
            </div>
        </>
       
    );
};

export default InterestModal;
