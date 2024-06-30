import React, { useEffect, useReducer } from "react";
import { database } from "../../firebase.jsx";
import { getDocs, query,where,getDoc,doc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContest";

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
        if(folderId==null){
            dispatch({type:tp.update,payload:{folder:ROOT}})
        }else{
            const fetchFolder=async()=>{
                doc
                const q=query(database.folders,where('id','==',folderId),where('userId','==',curruser.uid))
                const qsnap=await getDoc(q);  
            }
            fetchFolder()
        }  
    },[folderId])

    useEffect(()=>{
        const fetchChild=async()=>{
            const q=query(database.folders,where('parID','==',folderId),where('userId','==',curruser.uid))
                    const qsnap=await getDoc(q);
                    const folder={name:qsnap.data().name,parent:qsnap.data().parID,path:[]};
                    dispatch({type:tp.update,payload:{folder:folder}})
        }
        fetchChild();
    },[folderId,curruser])
    
    return state;
}