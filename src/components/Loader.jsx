import React from 'react';
import { HashLoader } from 'react-spinners';

export const Loader = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <HashLoader color='#1e61b0' size={80} />
        </div>
    )
}
