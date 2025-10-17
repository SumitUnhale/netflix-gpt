import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [isSignInform, setIsSignInForm] = useState(true);
    const dispatch = useDispatch();
    const [errMSg, setErrMsg] = useState(null);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const navigate = useNavigate();

    const handleClick = () => {        
        const mesg = checkValidData(email.current.value, password.current.value);
        setErrMsg(mesg)
        if(mesg) return;
        if(!isSignInform){
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                displayName: email.current.value, photoURL: "https://avatars.githubusercontent.com/u/161868847?v=4"
                }).then(() => {
                    const { uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(addUser({ uid:uid, email: email, displayName: displayName, photoURL: photoURL}));
                }).catch((error) => {
                    setErrMsg(error)
                });
                navigate("/browse");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrMsg(errorCode + " - " + errorMessage);
            });
        }else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/browse"); 
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrMsg(errorCode +" - "+ errorMessage)
            });
        }

    }

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
            <h1 className='font-bold text-3xl my-3'>
                {isSignInform ? "Sign In" : "Sign Up"}
            </h1>
            {!isSignInform && <input ref={name} type='text' placeholder='Full name' className='bg-gray-700 p-3 my-2 rounded w-full'/>}
            <input type='text' ref={email} placeholder='Email address' className='bg-gray-700 p-3 my-2 rounded w-full'/>
            <input type='password' ref={password} placeholder='Password' className='bg-gray-700 p-3 my-2 rounded w-full'/>
            <p className='text-red-500 font-bold mt-2'>
                {errMSg}
            </p>
            <button onClick={handleClick} className='my-4 py-2 px-4 bg-red-700 rounded w-full'>
                {isSignInform ? "Sign In" : "Sign Up"}
            </button>
            <p className='my-3 cursor-pointer hover:text-red-500' onClick={toggleSignInForm}>
                {isSignInform ? "New to Netflix? Sign Up Now" : "already registerd? Sign In Now"}
            </p>
        </form>
    </div>
  )
}

export default Login
