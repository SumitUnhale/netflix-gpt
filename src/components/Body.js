import Login from './Login';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from './Browse';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { addUser, removeUser} from "../utils/userSlice";

const Body = () => {

    const dispatch = useDispatch();
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }

    ])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                const email = user.email;
                const displayName = user.displayName;
                const photoURL = user.photoURL;
                dispatch(addUser({ uid:uid, email: email, displayName: displayName, photoURL: photoURL}));
                // navigate("/browse")
            } else {
                dispatch(removeUser());
            }
        });
    }, [])

  return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body
