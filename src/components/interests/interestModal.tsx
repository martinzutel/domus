'use client';

import React, { useState, useEffect } from 'react';
import CheckboxGroup from '@/components/interests/CheckboxGroup';
import ModalCard from '@/components/assets/ModalCard';

interface InterestModalProps {
  onClose: () => void;
  onApplyFilters: (filters: string[]) => void;
}

const InterestModal: React.FC<InterestModalProps> = ({ onClose, onApplyFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [tags, setTags] = useState<{ value: string; label: string }[]>([]); // For storing fetched tags
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  // Fetch tags from the API
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('/api/tags/getAllTags'); // API call
        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }

        const data = await response.json();
        const formattedTags = data.map((tag: { tagName: string; tagValue: string }) => ({
          value: tag.tagValue,
          label: tag.tagName,
        }));
        setTags(formattedTags); // Set fetched tags
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(selectedFilters);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close Modal"
      ></div>

      <ModalCard title="Search through interests" onClose={onClose}>
        <form
          className="flex flex-col items-center space-y-4 p-4"
          onSubmit={handleFormSubmit}
        >
          {loading ? (
            <p className="text-secondarycolor">Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <div className="max-h-[300px] overflow-y-auto">
              <CheckboxGroup
                interests={tags} // Use fetched tags here
                onCheckedChange={(values) => setSelectedFilters(values)}
              />

              <div className='h-[100px]'></div>
              
            </div>
          )}
          <button
            type="submit"
            className="bg-coolred text-white py-2 px-6 rounded-full hover:bg-coolredhl bottom-3 sticky"
          >
            Apply Filters
          </button>
        </form>
      </ModalCard>
    </div>
  );
};

export default InterestModal;
