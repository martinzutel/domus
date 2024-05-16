'use client'

import React, { useState } from 'react';
import RegisterForm from './registerpop';
import { signIn, useSession } from "next-auth/react";
import popupCenter from './auth/windowpopup';
import { RxCross2 } from "react-icons/rx";
import { FcGoogle } from "react-icons/fc";



interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const [preferredAgeRange, setPreferredAgeRange] = useState<[number, number]>([18, 35]);

  const { data: session, status } = useSession();

  const openRegisterForm = () => setShowRegisterForm(true);
  const closeRegisterForm = () => setShowRegisterForm(false);

  const handleRegisterSubmit = (formData: FormData) => {
    // Handle registration logic here
    console.log(formData);
    // For now, let's just close the form
    closeRegisterForm();   
    
    const { data: session } = useSession();
  };

  const handleSliderChange = (values: [number, number]) => setPreferredAgeRange(values);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-maincolor rounded-lg p-8 text-center relative flex flex-col">

            <h2 className="text-2xl font-bold mb-4 text-white">Login/Register</h2>
            

            <button onClick={() => {setShowRegisterForm(true); popupCenter("google-signin", "Sign In")}} className="bg-black text-white rounded-md px-4 py-2 mb-2 hover:bg-gray-800  flex items-center justify-center">
              <FcGoogle /> <span className='ml-2 pb-[1px]'>Google</span> 
            </button>
           
             
            <button onClick={onClose} className="absolute top-2 left-2 text-coolred ">
              <RxCross2 />
            </button>
        </div>
      </div>

  

      {showRegisterForm && session && (
        <RegisterForm
          isOpen={showRegisterForm}
          onClose={closeRegisterForm}
          onSubmit={handleRegisterSubmit}
          preferredAgeRange={preferredAgeRange}
          onPreferredAgeRangeChange={handleSliderChange}
        />
      )}
    </>
  );
};

export default Popup;
