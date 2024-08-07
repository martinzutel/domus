import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import RegisterForm from './registerpop'; // Import the RegisterForm component

interface SignInButtonProps {
  onClick: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ onClick }) => {
  const { data: session, status } = useSession();
  const [isRegisterFormOpen, setRegisterFormOpen] = useState(false);

  useEffect(() => {
    // Open the register form if the user is authenticated and registration is not complete
    if (status === 'authenticated' && !session?.user?.isRegisterComplete) {
      setRegisterFormOpen(true);
    }
  }, [status, session]);

  const handleSignIn = async () => {
    await signIn('google');
  };

  const handleSignOut = async () => {
    await signOut();
    setRegisterFormOpen(false);
  };

  const handleRegisterFormSubmit = (formData: any) => {
    console.log('Form submitted:', formData);

    setRegisterFormOpen(false);
  };

  return (
    <div className="block">
      <div className="flex justify-center content-center">
        {session?.user ? (
          <button
            onClick={handleSignOut}
            className="border-solid text-darkgre font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full mr-[0.7rem] font-sofia-pro hover:bg-coolredhl active:bg-coolreddrk"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={handleSignIn}
            className="border-solid text-darkgre font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full mr-[0.7rem] font-sofia-pro hover:bg-coolredhl active:bg-coolreddrk"
          >
            Sign In
          </button>
        )}
      </div>

      {isRegisterFormOpen && (
        <RegisterForm
          isOpen={isRegisterFormOpen}
          onClose={() => setRegisterFormOpen(false)}
          onSubmit={handleRegisterFormSubmit}
        />
      )}
    </div>
  );
};

export default SignInButton;
