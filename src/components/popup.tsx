import React, { useState, useEffect } from 'react';

const LoginRegisterPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true); // Set showPopup to true when component mounts
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-maincolor rounded-lg p-8 text-center">
            <button onClick={togglePopup} className="absolute top-2 right-2 text-gray-600">
              Close
            </button>
            <h2 className="text-2xl font-bold mb-4 text-white">Login/Register</h2>
            <div>
              <button className="bg-black text-white rounded-md px-4 py-2 mb-2 hover:bg-gray-800 mr-4">Google</button>
              <button className="bg-black text-white rounded-md px-4 py-2 mb-2 hover:bg-gray-800">Apple</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginRegisterPopup;
