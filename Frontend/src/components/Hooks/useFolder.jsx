import React, { useEffect, useReducer } from "react";
import { database } from "../../firebase";
import { query } from "firebase/firestore";
const tp={
    update:"UPDATE",
    select:"SELECT",
    child:"CREATE_CHILD"
}

export const Folder=(folderId=null,folder=null)=>{
    const reducer=(state, {type,payload})=>{
        switch (type) {
            case tp.update:
                return {...state,folder:payload.folder, folderId:payload.folderId};
            case tp.child:

            default:
                console.log("Invalid option");
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
        dispatch({type:tp.update,payload:{folderId:folderId,folder:folder}})
    },[folderId,folder])
    
    useEffect(()=>{
        dispatch({type:tp.child,payload:{childFolders:})
    },[folderId])
    
    return state;
}