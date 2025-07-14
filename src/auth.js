import { getAuth,createUserWithEmailAndPassword, signOut } from "firebase/auth";
import app from "./firebaseConfig";
const auth=getAuth(app);

export const signUp = async (email,password) => {
    try{
        const userCredential =await createUserWithEmailAndPassword(auth,email,password);
        return userCredential.user;
    }catch(error){
        console.error(error.message);
    }
};

export const signIn = async (email,password) => {
    try{
        const userCredential =await signInWithEmailAndPassword(auth,email,password);
        return userCredential.user;
    }catch(error){
        console.error(error.message);
    }
};

export const logOut = async (email,password) => {
    try{
        await signOut(auth);
    }catch(error){
        console.error(error.message);
    }
};
