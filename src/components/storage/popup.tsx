import React, { useState, useEffect } from 'react';

const LoginRegisterPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true); // Set showPopup to true when component mounts
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleLogin = () => {
    // Handle login logic here
  };

  const handleRegister = () => {
    // Handle registration logic here
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-maincolor rounded-lg p-8">
            <button onClick={togglePopup} className="absolute top-2 right-2 text-gray-600">
              Close
            </button>
            <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
            <form onSubmit={handleLogin} className="mb-4">
              <input type="text" placeholder="Username" className="w-full rounded-md p-2 mb-2 bg-darkgre text-white placeholder-gray-300" /> {/* Styling for the input */}
              <input type="password" placeholder="Password" className="w-full rounded-md p-2 mb-2 bg-darkgre text-white placeholder-gray-300" />
              <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
                Login
              </button>
            </form>
            <h2 className="text-2xl font-bold mb-4 text-white">Register</h2>
            <form onSubmit={handleRegister}>
              <input type="text" placeholder="Username" className="w-full rounded-md p-2 mb-2 bg-darkgre text-white placeholder-gray-300" />
              <input type="email" placeholder="Email" className="w-full rounded-md p-2 mb-2 bg-darkgre text-white placeholder-gray-300" />
              <input type="password" placeholder="Password" className="w-full rounded-md p-2 mb-2 bg-darkgre text-white placeholder-gray-300" />
              <button type="submit" className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600">
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginRegisterPopup;
