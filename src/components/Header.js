import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { addUser, removeUser} from "../utils/userSlice";
import { logoURL, userLogoURL } from "../utils/constant";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
      const unsubscribe =  onAuthStateChanged(auth, (user) => {
          if (user) {
              const uid = user.uid;
              const email = user.email;
              const displayName = user.displayName;
              const photoURL = user.photoURL;
              dispatch(addUser({ uid:uid, email: email, displayName: displayName, photoURL: photoURL}));
              navigate("/browse")
          } else {
              dispatch(removeUser());
              navigate("/")
          }

          return () => unsubscribe();
      });
  }, []);

  const handleSignout = () => {
    signOut(auth)
    .then(() => {})
    .catch((error) => {
      navigate("/error")
    });
  }
  // src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
  // src={user.photoURL}

  return (
    <div className='flex absolute w-screen bg-gradient-to-b from-black z-10 justify-between'>
      <img className='w-60 px-8 py-2' src={logoURL}></img>
      {user && <div className='my-6 mx-5 flex'>
        <img className='w-10 mx-2 rounded' src={userLogoURL} alt='user logo'></img>
        <button onClick={handleSignout} className='font-bold text-white'>(sign out)</button>
      </div>}
    </div>
  )
}

export default Header; 