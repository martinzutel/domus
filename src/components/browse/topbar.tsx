
import React, { ReactNode} from 'react'

interface TopbarProps {
    children?: ReactNode;
}

const Topbar: React.FC<TopbarProps> = ({ children }) => {

    
    return ( 
        <div className='w-[full] h-[60px] sticky flex items-center justify-center top-2 z-10'>
            <div className='z-10 px-[10px] rounded-full h-[60px] flex items-center justify-center bg-maincolor bg-opacity-80 top-0 backdrop-blur-sm sticky'>
             {children}
            </div>
        </div>
        
    )

   
}

export default Topbar
