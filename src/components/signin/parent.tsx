// ParentComponent.tsx
'use client'

import React, { useState } from 'react';
import SignInButton from './SignInButton';
import Popup from './popup';

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
