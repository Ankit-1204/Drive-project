import React from "react";
import { RiFolderAddFill } from "react-icons/ri";
import { RiFileAddFill } from "react-icons/ri";

const Folder=()=>{
    return(
       
        <RiFolderAddFill className="w-9 h-9 md:w-14 md:h-14"/>
    
    )
}

const File=()=>{
    return(
        
        <RiFileAddFill className="w-9 h-9 md:w-14 md:h-14"/>
    
    )
    
}

export {File,Folder}