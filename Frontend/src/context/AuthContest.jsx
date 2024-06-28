import {createContext, useEffect, useContext ,useState } from "react";
import React from "react";
import { auth } from "../firebase";
import {  createUserWithEmailAndPassword ,onAuthStateChanged} from "firebase/auth";


export const userContext=createContext({});
export const useAuth=()=>{
    return useContext(userContext);
}
export const UserContextProvider=({children})=> {
    const [loading,setLoading]=useState(true);
    const [curruser,setUser]=useState({});
    const signup=(email,password)=>{
        createUserWithEmailAndPassword(auth,email,password).then((UserCredential)=>{
            return UserCredential.user;
        })
    }
        useEffect(()=>{
        const subscribe= onAuthStateChanged(auth, (cuser)=>{
            setUser(cuser)
            setLoading(false);
        })
        return subscribe;
        },[])
        
    
    const value={
        curruser:curruser,
        signup:signup
    }
    return(
        <userContext.Provider value={value} >
            {!loading && children}
        </userContext.Provider>
    )
}
