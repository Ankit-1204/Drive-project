import React from "react";
import { useFolder } from "../Hooks/useFolder";
export const FolderBox=({value,handleClick})=>{
    
    return(
        
        <button onClick={()=>handleClick(value.key)}  className=" bg-gray-600 p-3 m-2 rounded-md md:m-8">{value.name}</button>
        
    )
}