'use client';

import React, { useState, useEffect } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import CheckboxGroup from '@/components/interests/CheckboxGroup';

interface InterestModalProps {
  onClose: () => void;
  onApplyFilters: (filters: string[]) => void;
}

const InterestModal: React.FC<InterestModalProps> = ({ onClose, onApplyFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(selectedFilters);
  };

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

        <form
          className="flex flex-col items-center space-y-4"
          onSubmit={handleFormSubmit}
        >
          <h1 className="text-4xl text-secondarycolor font-sofia-pro">
            Search through interests:
          </h1>
          <div className="max-h-[300px] overflow-y-auto">
            <CheckboxGroup
              interests={[
                { value: 'fitness', label: 'Fitness' },
                { value: 'football', label: 'Football' },
                { value: 'basketball', label: 'Basketball' },
                { value: 'tennis', label: 'Tennis' },
                { value: 'golf', label: 'Golf' },
              ]}
              onCheckedChange={(values) => setSelectedFilters(values)}
            />
          </div>
          <button
            type="submit"
            className="bg-coolred text-white py-2 px-6 rounded-full hover:bg-coolredhl"
          >
            Apply Filters
          </button>
        </form>
      </div>
    </div>
  );
};

export default InterestModal;
