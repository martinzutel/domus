import React, { useState } from 'react';
import RegisterForm from './registerpop';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);
  const [preferredAgeRange, setPreferredAgeRange] = useState<[number, number]>([18, 35]);

  const openRegisterForm = () => setShowRegisterForm(true);
  const closeRegisterForm = () => setShowRegisterForm(false);

  const handleRegisterSubmit = (formData: FormData) => {
    // Handle registration logic here
    console.log(formData);
    // For now, let's just close the form
    closeRegisterForm();
  };

  const handleSliderChange = (values: [number, number]) => setPreferredAgeRange(values);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-maincolor rounded-lg p-8 text-center relative">
          <h2 className="text-2xl font-bold mb-4 text-white">Login/Register</h2>
          <div>
            <button onClick={openRegisterForm} className="bg-black text-white rounded-md px-4 py-2 mb-2 hover:bg-gray-800 mr-4">Google</button>
            <button onClick={openRegisterForm} className="bg-black text-white rounded-md px-4 py-2 mb-2 hover:bg-gray-800">Apple</button>
          </div>
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
            Close
          </button>
        </div>
      </div>
      {showRegisterForm && (
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