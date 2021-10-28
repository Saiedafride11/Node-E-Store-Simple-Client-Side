import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebaseInitializeApp";

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();

    // const signInUsingGoogle = () => {
    //     signInWithPopup(auth, googleProvider)
    //     .then(result => {
    //       console.log(result.user);
    //       setUser(result.user)
    //     })
    //     .catch(error => {
    //       console.log(error.message);
    //       setError(error.message)
    //     });
    // }

    const signInUsingGoogle = () => {
        return signInWithPopup(auth, googleProvider)
        // .then(result => {
        //   console.log(result.user);
        //   setUser(result.user)
        // })
    }

    const logOut = () => {
      signOut(auth)
      .then(() => {
          setUser({});
  })
  }

    useEffect( () => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          setUser(user)
        } 
      });
      return unsubscribe;
    }, [])
  
    return {user, error, signInUsingGoogle, logOut}
};

export default useFirebase;