import React, { useEffect, useState } from "react";
import { Folder, File } from "./Buttons";
import FileModal from "./FileModal";
import { useFolder } from "../Hooks/useFolder.jsx";
import { FolderBox } from "./FoldarBox.jsx";

const Front=()=>{
    const [loading,setLoading]=useState(true);
    const {folderId,folder,childFolders}=useFolder("NNs6johKz8vSSVQsNskh");
    console.log(folder);
    console.log(childFolders);
    const [fileModal,setFileModal]=useState(false);
    
    const handleFoldClick=(foldId)=>{
        console.log(foldId)
        useFolder(foldId,null);
        
    }

    const handleFileIconClick=()=>{
        setFileModal(!fileModal);
    }
    useEffect(()=>{
        if(folder!==null){
            setLoading(false)
        }
    },[folder])
    return(
        
    <div >
    {!loading && 
    <div>
       <div className="w-full mx-auto px-9 py-8 bg-gray-200">
        <div className="flex flex-wrap justify-between">
            <span className="text-2xl font-bold font-sans">{folder.name}</span>
            <div className=" w-1/6 flex flex-row justify-between md:pr-8">
                <button className=" hover:text-green-500 rounded"><Folder /></button>
                <button onClick={handleFileIconClick} className=" hover:text-blue-400 rounded"><File /></button>
            </div>
        </div>
    </div>
        <div className="flex w-full flex-col md:flex-row mx-auto px-9 py-8">
            {childFolders.map((folder)=>{ return <FolderBox key={folder.key} value={folder} handleClick={handleFoldClick}/>})}

        </div>

    </div>
    }
        {fileModal && <FileModal click={handleFileClick} />}
    </div>
    )
    
}
export default Front;