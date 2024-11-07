'use client';

import React, { useEffect, ReactNode } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';

interface InterestModalProps {
  children: ReactNode;
  onClose: () => void;
}

const InterestModal: React.FC<InterestModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close Modal"
      ></div>

      {/* Modal content */}
      <div className="relative bg-maincolor w-[90%] max-w-[500px] p-7 pt-4 rounded-3xl flex flex-col items-center space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-coolred text-3xl"
          aria-label="Close Modal"
        >
          <IoMdArrowRoundBack />
        </button>

        {children}
      </div>
    </div>
  );
};

export default InterestModal;
