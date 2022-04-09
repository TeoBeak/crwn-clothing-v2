import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAJvwdWzb_x6qukdIB9E1gZKDtk-yMlY8Y",
    authDomain: "crown-clothing-db-5902d.firebaseapp.com",
    projectId: "crown-clothing-db-5902d",
    storageBucket: "crown-clothing-db-5902d.appspot.com",
    messagingSenderId: "847040369685",
    appId: "1:847040369685:web:5059a067335263ff1fea1c"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
      prompt: "select_account"
  })

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()
export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    console.log(userAuth);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt});
        } catch(error) {
            console.log("error creating the user", error.message);
        }
    }

    return userDocRef;
}