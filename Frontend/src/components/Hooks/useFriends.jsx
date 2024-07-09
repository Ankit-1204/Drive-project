import { onSnapshot, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useReducer, useState } from "react";
import { database } from "../../firebase";
import { doc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContest";

export const useFriends=()=>{
    const {curruser}=useAuth()
    const userId=curruser.uid;
    const [request,setRequest]=useState([]);
    const [friend,setFriend]=useState([]);

    useEffect(()=>{
        const docRef= doc(database.user,userId);
         const unsubscribe= onSnapshot(docRef,async(snapshot)=>{
            if(snapshot.exists()){
                const data=snapshot.data();
                const currentRequests = data.requests || [];
                const currentFriends = data.friends || [];

                const friendIds = currentFriends.map(friend => friend.id);
                
                const updatedRequests = currentRequests.filter(request => !friendIds.includes(request.id));
                if (updatedRequests.length !== currentRequests.length) {
                    await updateDoc(docRef, { requests: updatedRequests });
                }
                setRequest(updatedRequests);
                setFriend(snapshot.data().friends);
            }
         })
        return ()=>unsubscribe();
    },[userId])

    return {request,friend};
}

