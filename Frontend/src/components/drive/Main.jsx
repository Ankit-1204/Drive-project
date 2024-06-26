import React from "react";
import { Folder, File } from "./Buttons";

const Front=()=>{
    return(
       <div className="w-full mx-auto px-9 py-8 bg-gray-200">
        <div className="flex flex-wrap justify-between">
            <span className="text-2xl font-bold font-sans">Content</span>
            <div className=" w-1/6 flex flex-row justify-between">
                <Folder />
                <File />
            </div>
        </div>
    </div> 
    )
    
}
export default Front;