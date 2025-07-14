import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
const firebaseConfig = {
  apiKey: "AIzaSyAzsgZ1qjDNL1IcsULPQxrckjfFvySU2E4",
  authDomain: "tmdb-webapp.firebaseapp.com",
  projectId: "tmdb-webapp",
  storageBucket: "tmdb-webapp.appspot.com", 
  messagingSenderId: "932974941285",
  appId: "1:932974941285:web:4636493ab06e59cb44a28c",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 

export { app, auth }; 
