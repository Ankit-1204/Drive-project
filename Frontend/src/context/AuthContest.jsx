import {createContext, useEffect, useContext ,useState } from "react";
import React from "react";
import { auth } from "../firebase";
import {  createUserWithEmailAndPassword ,onAuthStateChanged, signOut,signInWithEmailAndPassword  } from "firebase/auth";
import { database } from "../firebase";
import { setDoc } from "firebase/firestore";


export const userContext=createContext({});
export const useAuth=()=>{
    return useContext(userContext);
}
export const UserContextProvider=({children})=> {
    const [loading,setLoading]=useState(true);
    const [curruser,setUser]=useState({});
    const signup=(email,password)=>{
        createUserWithEmailAndPassword(auth,email,password).then(async(UserCredential)=>{
            const user=UserCredential.user;
            console.log(UserCredential.user);
            await setDoc(doc(db, "users", user.uid), {
                firstName: "user",
                lastName: "name",
                email:email,
                friends: []
            });
            console.log("User added to Firestore");
        })
    }
    const signout=()=>{
        return signOut(auth);
    }
    useEffect(()=>{
    const subscribe= onAuthStateChanged(auth, (cuser)=>{
        setUser(cuser)
        setLoading(false);
    })
    return subscribe;
    },[])
    
    const login=(email,password)=>{
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                return console.log(userCredential.user);})
    }
    
    const value={
        curruser:curruser,
        signup:signup,
        signout:signout,
        login:login
    }
    return(
        <userContext.Provider value={value} >
            {!loading && children}
        </userContext.Provider>
    )
}
