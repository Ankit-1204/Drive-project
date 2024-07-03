import React, { useEffect, useReducer } from "react";
import { database } from "../../firebase.jsx";
import { getDocs, query,where,getDoc,doc,orderBy } from "firebase/firestore";
import { useAuth } from "../../context/AuthContest";
import { onSnapshot } from "firebase/firestore";
import { documentId } from "firebase/firestore";
export const useFolder=(folderId=null,folder=null)=>{
    const tp={
        update:"UPDATE",
        select:"SELECT",
        child:"CREATE_CHILD"
    }

    const {curruser}=useAuth();
    const reducer=(state, {type,payload})=>{
        switch (type) {
            case tp.select:
                return {...state,folder:payload.folder, folderId:payload.folderId};
            case tp.update:
                return {...state,folder:payload.folder};
            case tp.child:
                return {...state,childFolders:payload.childFolders}
            default:
                console.log("Invalid option");
                return state;
        }
    }
    const ROOT={name:"root",parent:null,path:[]};
    const [state,dispatch]=useReducer(reducer,{
                folderId,
                folder,
                childFolders:[],
                childFiles:[]
            })
    useEffect(()=>{
        dispatch({type:tp.select,payload:{folderId:folderId,folder:folder}})
    },[folderId,folder])
    useEffect(()=>{
        if(folderId===null){
            dispatch({type:tp.update,payload:{folder:ROOT}})
        }
        else{
            
            const q=doc(database.folders,folderId);
            const unsubscribe= onSnapshot(q,(snapshot)=>{dispatch({type:tp.update,payload:{folder:snapshot.data()}})}) 
            return ()=>unsubscribe();
        }  
    },[folderId])

    useEffect(()=>{
        
        const q=query(database.folders,where('parID','==',folderId),where('userId','==',curruser.uid),orderBy("createAtTime"))
        const unsubscribe=onSnapshot(q,(snapshot)=>{dispatch({type:tp.child,payload:{childFolders:snapshot.docs.map(docs=>({key:docs.id,...docs.data()}))}})})
        return ()=>unsubscribe();
    },[folderId,curruser])
    
    return state;
}
