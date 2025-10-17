import React, { use } from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignout = () => {
    signOut(auth).then(() => {
      navigate("/")
    }).catch((error) => {
      navigate("/error")
    });
  }
  //src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'

  return (
    <div className='flex absolute w-screen bg-gradient-to-b from-black z-10 justify-between'>
      <img className='w-60 px-8 py-2' src='https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png'></img>
      {user && <div className='my-6 mx-5 flex'>
        <img className='w-10 mx-2 rounded' src={user.photoURL}  alt='user logo'></img>
        <button onClick={handleSignout} className='font-bold text-white'>(sign out)</button>
      </div>}
    </div>
  )
}

export default Header; 