import {createContext, useEffect, useContext ,useState } from "react";
import React from "react";
import { auth } from "../firebase";
import {  createUserWithEmailAndPassword ,onAuthStateChanged, signOut,signInWithEmailAndPassword  } from "firebase/auth";


export const userContext=createContext({});
export const useAuth=()=>{
    return useContext(userContext);
}
export const UserContextProvider=({children})=> {
    const [loading,setLoading]=useState(true);
    const [curruser,setUser]=useState({});
    const signup=(email,password)=>{
        createUserWithEmailAndPassword(auth,email,password).then((UserCredential)=>{
            return console.log(UserCredential.user);
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
