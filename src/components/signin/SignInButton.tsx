import { signOut, useSession } from 'next-auth/react';
import React from 'react';

interface SignInButtonProps {
  onClick: () => void;
}

const SignInButton: React.FC<SignInButtonProps> = ({ onClick }) => {
  const { data: session, status } = useSession()
  return (
    
    <div className="block">
        <div className="flex justify-center content-center">
          
          {session?.user? (
            <button onClick={() => signOut()} className='className="border-solid text-darkgre font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full mr-[0.7rem] font-sofia-pro hover:bg-coolredhl active:bg-coolreddrk"'>Sign Out</button>
          ) :(
            <button onClick={onClick} className='className="border-solid text-darkgre font-black bg-coolred text-lg pt-[0.28rem] pb-[0.47rem] px-[2rem] rounded-full mr-[0.7rem] font-sofia-pro hover:bg-coolredhl active:bg-coolreddrk"'>Sign In</button>
          )}
        </div>  
    </div>
  )

}

export default SignInButton;
