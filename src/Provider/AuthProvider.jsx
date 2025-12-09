import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

  const AxiosSecure = useAxiosSecure()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create User with Email & Password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with Email & Password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update User Profile (name, photo)
  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  // Observe user state
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     console.log("Current User:", currentUser);

  //     // JWT Token logic can be added here later
  //     /*
  //     if (currentUser) {
  //       axios.post('http://localhost:5000/jwt', { email: currentUser.email })
  //       .then(res => {
  //         // store token
  //       });
  //     } else {
  //       // remove token
  //     }
  //     */

  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        console.log('CurrentUser-->', currentUser);
        
        if (currentUser) {
            // get token and store client
            const userInfo = { email: currentUser.email };
            AxiosSecure.post('http://localhost:3000/jwt', userInfo, { withCredentials: true })
                .then(res => {
                    if (res.data.success) {
                        setLoading(false);
                    }
                })
        } else {
            // remove token (if user stored in the client side)
            AxiosSecure.post('http://localhost:3000/logout', {}, { withCredentials: true })
                .then(res => {
                    setLoading(false);
                })
        }
        
    });
    return () => {
        return unsubscribe();
    }
}, [AxiosSecure])

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
    updateUserProfile,
  };

  

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
 