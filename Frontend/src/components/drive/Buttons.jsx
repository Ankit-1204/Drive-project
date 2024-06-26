import React from "react";
import { RiFolderAddFill } from "react-icons/ri";
import { RiFileAddFill } from "react-icons/ri";

const Folder=()=>{
    return(
       
        <RiFolderAddFill className="   w-10 h-10"/>
    
    )
}

const File=()=>{
    return(
        
        <RiFileAddFill className=" w-10 h-10"/>
    
    )
    
}

export {File,Folder}