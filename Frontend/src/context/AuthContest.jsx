import {createContext, useEffect, useContext ,useState } from "react";
import React from "react";
import { auth } from "../firebase";
import {  createUserWithEmailAndPassword ,onAuthStateChanged} from "firebase/auth";

export const userContext=createContext({});
export const useAuth=()=>{
    return useContext(userContext);
}
export const userContextProvider=({children})=> {
    const [user,setUser]=useState({});
    const login=(email,password)=>{
        createUserWithEmailAndPassword(auth,email,password).then((UserCredential)=>{
            const user=UserCredential.user;
        })
        useEffect(()=>{
        const subscribe= onAuthStateChanged(auth, (user)=>{
            setUser(user)
        })
        return ()=>subscribe();
        },[])
        
    }

    return(
        <userContext.Provider user={user} setUser={setUser}>
            {children}
        </userContext.Provider>
    )
}