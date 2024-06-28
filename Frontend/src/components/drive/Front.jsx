import React, { useState } from "react";
import { Folder, File } from "./Buttons";
import FileModal from "./FileModal";

const Front=()=>{
    const [fileModal,setFileModal]=useState(false);
    
    const handleFileClick=()=>{
        setFileModal(!fileModal);
    }
    return(
    <div >
       <div className="w-full mx-auto px-9 py-8 bg-gray-200">
        <div className="flex flex-wrap justify-between">
            <span className="text-2xl font-bold font-sans">Content</span>
            <div className=" w-1/6 flex flex-row justify-between md:pr-8">
                <button className=" hover:text-green-500 rounded"><Folder /></button>
                <button onClick={handleFileClick} className=" hover:text-blue-400 rounded"><File /></button>
            </div>
        </div>
    </div>
        {fileModal && <FileModal click={handleFileClick} />}
    </div>
    )
    
}
export default Front;