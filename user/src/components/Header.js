import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
    <div className='flex justify-between items-center px-4 md:px-16 py-4 bg-white border-b border-slate-900/10 backdrop-blur-2xl'>
      <Link to='/streams' className='font-semibold text-xl'>Steamer</Link>
      <div className='flex gap-3 items-center'> 
        <Link to='/streams' className='mr-4 font-semibold text-sm text-slate-800 hover:text-blue-500'>All Streams</Link>
        <GoogleAuth />
      </div>
    </div>
  );
}

export default Header;