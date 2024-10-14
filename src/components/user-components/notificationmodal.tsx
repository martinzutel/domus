'use client';
import React, { useEffect } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import MatchRequest from '@/components/user-components/matchrequest';

type MatchRequestType = {
  id: string;
  receiverId: string;
  username: string;
  profileImage: string;
};

type NotificationModalProps = {
  onClose: () => void;
};

const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {
  const [matchRequests, setMatchRequests] = React.useState<MatchRequestType[]>([]);

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

        // Extract necessary information from the pending requests
        const updatedRequests = pending.map((request) => ({
          id: request.id,
          receiverId: request.receiverId,
          username: request.requester.name,
          profileImage: request.requester.image,
        }));

        setMatchRequests(updatedRequests); // Update the state with user info
      } catch (error) {
        console.error('Failed to fetch match requests or user profiles:', error);
      }
    };

    fetchMatchRequests();
  }, []);

  const respondToMatch = async (id: string, action: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/match/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cookie: document.cookie,
        },
        body: JSON.stringify({
          matchRequestId: id,
          action: action,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      console.log(`${action.charAt(0).toUpperCase() + action.slice(1)}ed match request with ID: ${id}`);
    } catch (error) {
      console.error(`Failed to ${action} match request:`, error);
    }
  };

  const handleAccept = (id: string) => {
    respondToMatch(id, 'accept');
  };

  const handleDeny = (id: string) => {
    respondToMatch(id, 'deny');
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-30 top-0 fixed z-40">
      <div className="absolute h-[500px] max-h-[500px] w-[500px] bg-darkgre border-secondarycolor rounded-3xl p-6 overflow-hidden">
        <button className="absolute top-4 left-4 text-2xl text-secondarycolor" onClick={onClose}>
          <IoMdArrowRoundBack />
        </button>

        <div className="text-secondarycolor">
          <h1 className="text-2xl font-bold mb-4 text-secondarycolor mt-5">Notifications</h1>

          <div className="max-h-[400px] overflow-y-auto">
            {matchRequests.length > 0 ? (
              matchRequests.map((request) => (
                <div key={request.id} className="mb-4 rounded-lg">
                  <MatchRequest
                    username={request.username}
                    profileImage={request.profileImage}
                    onAccept={() => handleAccept(request.id)}
                    onDeny={() => handleDeny(request.id)}
                  />
                </div>
              ))
            ) : (
              <p className="text-lg">You have no new notifications.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
