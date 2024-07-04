import React, { useEffect, useState } from "react";
import { Folder, File } from "./Buttons";
import FolderModal from "./FolderModal.jsx";
import FileModal from "./FileModal.jsx";
import { useFolder } from "../Hooks/useFolder.jsx";
import { Link, useParams } from "react-router-dom";
import FolderPath from "./FolderPath.jsx";

const Front=()=>{
    let {Id}=useParams();
    console.log(Id);
    console.log(Id);
    if(Id===undefined){
        Id=null;
    }
    console.log(Id);
    
    const {folderId,folder,childFolders,childFiles}=useFolder(Id,null);
    console.log(folder);
    console.log(childFolders);
    const [fileModal,setFileModal]=useState(false);
    const [folderModal,setFolderModal]=useState(false);

    const handleFolderIconClick=()=>{
        setFolderModal(!folderModal);
    }
    const handleFileIconClick=()=>{
        setFileModal(!fileModal);
    }
    return(
        
    <div >
     
    <div>
       <div className="w-full mx-auto px-9 py-8 bg-gray-200">
        <div className="flex flex-wrap justify-between">
            {folder ? <FolderPath folder={folder} /> :<span className="text-2xl font-bold font-sans">Loading</span>}
            <div className=" w-1/6 flex flex-row justify-between md:pr-8">
                <button onClick={handleFileIconClick} className=" hover:text-green-500 rounded"><File /></button>
                <button onClick={handleFolderIconClick} className=" hover:text-blue-400 rounded"><Folder /></button>
            </div>
        </div>
    </div>
    
        {folder && childFolders && <div className="flex w-full flex-col md:flex-row mx-auto px-9 py-8">
            {childFolders.map((folder)=>(<Link className=" bg-gray-600 p-3 m-2 rounded-md md:m-8" key={folder.key} to={'/folder/'+(folder.key)} >{folder.name}</Link>))}
            {childFiles.map((file)=>(<Link className=" bg-gray-600 p-3 m-2 rounded-md md:m-8" key={file.key} to={'/folder/'+(file.key)} >{file.name}</Link>))}
        </div>}
    
    </div>
     
        {folderModal && folder && <FolderModal folderId={folderId} click={handleFolderIconClick} folder={folder} />}
        {fileModal && folder && <FileModal folderId={folderId} click={handleFileIconClick} folder={folder} />}
    
    </div>
    )
    
}
export default Front;