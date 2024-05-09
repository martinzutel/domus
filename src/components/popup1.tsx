import React from 'react';

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-maincolor rounded-lg p-8 text-center relative">
         
            <h2 className="text-2xl font-bold mb-4 text-white">Login/Register</h2>
            <div>
          
            </div>
          </div>
        </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Popup;