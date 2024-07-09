import { onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useReducer, useState } from "react";
import { database } from "../../firebase";
import { doc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContest";

export const useFriends=()=>{
    const {curruser}=useAuth()
    const userId=curruser.uid;
    const [request,setRequest]=useState([]);

    useEffect(()=>{
        const docRef= doc(database.user,userId);
         const unsubscribe= onSnapshot(docRef,(snapshot)=>{
            if(snapshot.exists()){
                snapshot.data();
                setRequest(snapshot.data().requests);
            }
         })
        return ()=>unsubscribe();
    },[userId])

    return request;
}

