import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCeL2GxpGccgUofo7WXi1ElRGLxqOPSdWA",
  authDomain: "ping-45fd9.firebaseapp.com",
  projectId: "ping-45fd9",
  storageBucket: "ping-45fd9.firebasestorage.app",
  messagingSenderId: "1087904335407",
  appId: "1:1087904335407:web:5f0e5b4a582c7d31e6e8da"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try{
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name:"",
      avatar:"",
      bio: "Hey there!, I am using Ping",
      lastSeen: Date.now()
    })
    await setDoc(doc(db, "chats", user.uid), {
      chatData: []
    })

  }
  catch(error){
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
}

export {signup, login, logout, auth, db}