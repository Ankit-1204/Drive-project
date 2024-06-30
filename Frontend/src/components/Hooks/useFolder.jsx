import React, { useEffect, useReducer } from "react";
import { database } from "../../firebase.jsx";
import { getDocs, query,where } from "firebase/firestore";
import { useAuth } from "../../context/AuthContest";
const tp={
    update:"UPDATE",
    select:"SELECT",
    child:"CREATE_CHILD"
}
export const useFolder=(folderId=null,folder=null)=>{
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
        if(folderId==null){
            dispatch({type:tp.update,payload:{folder:ROOT}})
        }  
    },[folderId])

    useEffect(()=>{
        const fetchChild=async()=>{
            const q=query(database.folders,where('parID','==',folderId),where('userId','==',curruser.uid))
                    const qsnap=await getDocs(q);
                    dispatch({type:tp.child,payload:{childFolders:qsnap.docs.map(doc => ({ ...doc.data() }))}})
        }
        fetchChild();
    },[folderId,curruser])
    
    return state;
}