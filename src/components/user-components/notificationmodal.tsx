'use client';
import React, { useEffect } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import MatchRequest from '@/components/user-components/matchrequest'; 

type NotificationModalProps = {
  onClose: () => void;
};


const matchRequests = [
  {
    id: 1,
    username: 'User1',
    profileImage: '/images/images.jpg', 
  },
  {
    id: 2,
    username: 'User2',
    profileImage: '/images/images.jpg',
  },
  {
    id: 3,
    username: 'User3',
    profileImage: '/images/images.jpg', 
  },
  {
    id: 4,
    username: 'User4',
    profileImage: '/images/images.jpg',
  },
  {
    id: 5,
    username: 'User5',
    profileImage: '/images/images.jpg', 
  },
  {
    id: 6,
    username: 'User6',
    profileImage: '/images/images.jpg',
  },
];

const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {


  useEffect(() => {
    document.body.style.overflow = 'hidden'; 
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

 
  const handleAccept = (id: number, username: string) => {
    console.log(`Accepted match request from ${username} (ID: ${id})`);
    
  };


  const handleDeny = (id: number, username: string) => {
    console.log(`Denied match request from ${username} (ID: ${id})`);
    
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black bg-opacity-30 top-0  fixed z-40">
      <div className="absolute  h-[500px] max-h-[500px] w-[500px] bg-darkgre border-secondarycolor rounded-3xl p-6 overflow-hidden">
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
                    onAccept={() => handleAccept(request.id, request.username)} 
                    onDeny={() => handleDeny(request.id, request.username)}     
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
