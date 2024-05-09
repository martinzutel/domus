import React from 'react';

interface SignInButtonProps {
  onClick: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Sign In</button>;
}

export default SignInButton;
