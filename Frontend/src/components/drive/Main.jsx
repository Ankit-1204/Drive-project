import React, { useState } from "react";
import { Folder, File } from "./Buttons";
import FileModal from "./FileModal";

const Front=()=>{
    const [fileModal,setFileModal]=useState(false);
    const handleFileClick=()=>{
        setFileModal(true);
    }
    return(
    <div >
       <div className="w-full mx-auto px-9 py-8 bg-gray-200">
        <div className="flex flex-wrap justify-between">
            <span className="text-2xl font-bold font-sans">Content</span>
            <div className=" w-1/6 flex flex-row justify-between md:pr-8">
                <button className="border-4 border-black hover:border-green-500 hover:text-green-500 rounded"><Folder /></button>
                <button onClick={handleFileClick} className="border-4 border-black hover:border-blue-400 hover:text-blue-400 rounded"><File /></button>
            </div>
        </div>
    </div>
        {fileModal && <FileModal/>}
    </div>
    )
    
}
export default Front;