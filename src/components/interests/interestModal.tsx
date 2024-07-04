import React from 'react';

interface InterestModalProps {
    children: React.ReactNode;
}

const InterestModal: React.FC<InterestModalProps> = ({ children }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="fixed inset-0 bg-black-500 opacity-75"></div>
            <div className="relative w-[600px] h-[400px] bg-gray-900 rounded-10 p-[20px] rounded-3xl flex items-center justify-center">
                {children}
            </div>
        </div>
    );
};

export default InterestModal;