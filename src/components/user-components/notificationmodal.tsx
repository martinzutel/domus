'use client';

import React, { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import MatchRequest from '@/components/user-components/matchrequest';

type MatchData = {
  id: number;
  username: string;
  profileImage: string;
  matchDate: string;
  about: string;
  contact: string;
  ownTags: string[];
};

type NotificationModalProps = {
  onClose: () => void;
};

const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {
  const [matchRequests, setMatchRequests] = useState<MatchData[]>([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const fetchMatchRequests = async () => {
      try {
        const response = await fetch('/api/match/getNotifs');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        const { pending } = data;

        if (!Array.isArray(pending)) {
          throw new Error('Expected an array of pending requests.');
        }

        const updatedRequests = pending.map((request) => ({
          id: request.id,
          username: request.requester.name,
          profileImage: request.requester.image,
          matchDate: request.matchDate || new Date().toLocaleDateString(), // Mock or fallback date
          about: request.requester.about || "No about info",
          contact: request.requester.contact || "No contact info",
          ownTags: request.requester.ownTags || [],
        }));

        setMatchRequests(updatedRequests);
      } catch (error) {
        console.error('Failed to fetch match requests:', error);
      }
    };

    fetchMatchRequests();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
      <div className="relative h-[500px] w-[500px] bg-darkgre rounded-3xl p-6 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-secondarycolor text-3xl"
        >
          <IoMdArrowRoundBack />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-secondarycolor mt-5">Notifications</h2>

        <div className="max-h-[400px] overflow-y-auto">
          {matchRequests.length > 0 ? (
            matchRequests.map((request) => (
              <MatchRequest
                key={request.id}
                username={request.username}
                profileImage={request.profileImage}
                onAccept={() => {}}
                onDeny={() => {}}
              />
            ))
          ) : (
            <p className="text-lg text-secondarycolor">You have no new notifications.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
