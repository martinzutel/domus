// ParentComponent.tsx
import React, { useState } from 'react';
import SignInButton from './signinbutton';
import Popup from './popup1';

const ParentComponent: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleSignInClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <div>
      <SignInButton onClick={handleSignInClick} />
      {isPopupOpen && <Popup onClose={handlePopupClose} />}
    </div>
  );
}

export default ParentComponent;
