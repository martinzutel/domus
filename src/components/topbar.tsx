
import React, { ReactNode} from 'react'

interface TopbarProps {
    children?: ReactNode;
}

const Topbar: React.FC<TopbarProps> = ({ children }) => {

    
    return ( 
        
        <div className='z-10  w-full h-[80px] flex items-center justify-center bg-maincolor bg-opacity-80 top-0 backdrop-blur-sm sticky'>
            {children}
        </div>
    )

   
}

export default Topbar
