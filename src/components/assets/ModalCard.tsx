import React, { ReactNode } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';

interface ModalCardProps {
  title: string;
  onClose: () => void;
  children?: ReactNode;
}

const ModalCard: React.FC<ModalCardProps> = ({ title, onClose, children }) => {
  return (
    <div className="
      h-[400px] w-[600px] flex items-center relative justify-center bg-darkgre rounded-[30px] p-6 pt-20 overflow-hidden
    ">
      <button
        className="absolute top-5 right-5 text-coolred text-3xl"
        onClick={onClose}
        aria-label="Close Modal"
      >
        <RiCloseCircleFill />
      </button>

      <h1 className="font-bold text-white absolute text-4xl top-5 left-6">
        {title}
      </h1>

      <div className="h-full w-full bg-darkgre o rounded-md">
        {children}
      </div>
    </div>
  );
};

export default ModalCard;
