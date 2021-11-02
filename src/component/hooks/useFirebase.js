import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../Firebase/firebaseInitializeApp";

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true)

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

    // const signInUsingGoogle = () => {
    //     return signInWithPopup(auth, googleProvider)
    //     // .then(result => {
    //     //   console.log(result.user);
    //     //   setUser(result.user)
    //     // })
    // }

    const signInUsingGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider)
        // .then(result => {
        //   console.log(result.user);
        //   setUser(result.user)
        // })
        .finally(() => {
          setIsLoading(false)
      })
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
          getIdToken(user)
          // .then(idToken => console.log(idToken))
          .then(idToken => localStorage.setItem('idToken', idToken))
          setUser(user)
        }
        else{
          setUser({});
        }
        setIsLoading(false);
      });
      return unsubscribe;
    }, [])
  
    return {user, error, signInUsingGoogle, logOut, isLoading}
};

export default useFirebase;