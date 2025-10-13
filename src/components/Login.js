import React, { useState } from 'react';
import Header from './Header';

const Login = () => {

    const [isSignInform, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInform);
    }
  return (
    <div>
        <Header />  
        <div className='absolute'>
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/25f808aa-cecb-4753-8541-9a79f40c18ae/web/IN-en-20251006-TRIFECTA-perspective_507f47be-8780-4697-92cb-0f6c78177b6e_large.jpg' alt='background image' />
        </div> 
        <form onSubmit={(e)=> e.preventDefault()} className='absolute p-10 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-3xl my-3'>{isSignInform ? "Sign In" : "Sign Up"}</h1>
            {!isSignInform && <input type='text' placeholder='Full name' className='bg-gray-700 p-3 my-2 rounded w-full'/>}
            <input type='text' placeholder='Email address' className='bg-gray-700 p-3 my-2 rounded w-full'/>
            <input type='password' placeholder='Password' className='bg-gray-700 p-3 my-2 rounded w-full'/>
            <button className='my-4 py-2 px-4 bg-red-700 rounded w-full'>{isSignInform ? "Sign In" : "Sign Up"}</button>
            <p className='my-3 cursor-pointer hover:text-red-500' onClick={toggleSignInForm}>{isSignInform ? "New to Netflix? Sign Up Now" : "already registerd? Sign In Now"}</p>
        </form>
    </div>
  )
}

export default Login
