'use client'

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import RegisterForm from '@/components/signin/registerpop';

export default function Page() {
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const closeRegisterForm = () => setShowRegisterForm(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <button
        onClick={() => setShowRegisterForm(true)}
        className="border-solid text-darkgre font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full mr-[0.7rem] font-sofia-pro hover:bg-coolredhl active:bg-coolreddrk"
      >
        Open Register Form
      </button>

      {showRegisterForm && (
        <RegisterForm
          isOpen={showRegisterForm}
          onClose={closeRegisterForm}
          onSubmit={(formData) => {
            console.log('Submitted form data:', formData);
            closeRegisterForm();
          }}
        />
      )}
    </div>
  );
}
