import React, { useEffect, useState } from "react";
import { Folder, File } from "./Buttons";
import FolderModal from "./FolderModal.jsx";
import FileModal from "./FileModal.jsx";
import { useFolder } from "../Hooks/useFolder.jsx";
import { Link, useParams } from "react-router-dom";
import { FaFile } from "react-icons/fa";
import { IoFolderOpen } from "react-icons/io5";
import FolderPath from "./FolderPath.jsx";
import { FolderIcon } from "./Icon.jsx";

const Front=()=>{
    let {Id}=useParams();
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
        
    <div className="w-full">
     
    <div>
       <div className="w-full mx-auto px-9 py-1 bg-gray-200">
        <div className="flex flex-wrap justify-between items-center w-full">
            {folder ? <FolderPath folder={folder} /> :<span className="text-2xl font-bold font-sans">Loading</span>}
            <div className=" w-1/6 flex flex-row justify-between md:pr-8">
                <button onClick={handleFileIconClick} className=" hover:text-green-500 rounded"><File /></button>
                <button onClick={handleFolderIconClick} className=" hover:text-blue-400 rounded"><Folder /></button>
            </div>
        </div>
    </div>
    {/* className=" bg-gray-600 p-3 m-2 rounded-md md:m-8" */}
        {folder && childFolders && <div className="grid grid-cols-1 md:grid-cols-4 py-5 px-5 gap-6">
            {childFolders.map((folder)=>(<div><Link key={folder.key} to={'/folder/'+(folder.key)} ><button className=" px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><IoFolderOpen className=" mr-3 w-5 h-5 md:w-9 md:h-9" /> {folder.name}</button></Link></div>))}
            {childFiles.map((file)=>(<div><Link key={file.key}><button className=" px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><FaFile className=" mr-3 w-5 h-5 md:w-9 md:h-9" /> {file.name}</button></Link></div>))}
        </div>}
    
    </div>
     
        {folderModal && folder && <FolderModal folderId={folderId} click={handleFolderIconClick} folder={folder} />}
        {fileModal && folder && <FileModal folderId={folderId} click={handleFileIconClick} folder={folder} />}
        
    </div>
    )
    
}
export default Front;