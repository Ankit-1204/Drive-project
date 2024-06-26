import React from "react";
import { RiFolderAddFill } from "react-icons/ri";
import { RiFileAddFill } from "react-icons/ri";

const Folder=()=>{
    return(
       <div>
        <RiFolderAddFill className=" text-black hover:text-green-400 w-10 h-10"/>
    </div> 
    )
}

const File=()=>{
    return(
        <div>
        <RiFileAddFill className="text-black hover:text-blue-400 w-10 h-10"/>
    </div>
    )
    
}

export {File,Folder}