import React from "react";
import { RiFolderAddFill } from "react-icons/ri";
import { RiFileAddFill } from "react-icons/ri";

const Folder=()=>{
    <div>
        <RiFolderAddFill className=" text-white hover:text-green-400"/>
    </div>
}

const File=()=>{
    <div>
        <RiFileAddFill className="text-white hover:text-blue-400"/>
    </div>
}

export {File,Folder}