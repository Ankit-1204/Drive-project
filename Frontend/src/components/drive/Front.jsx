import React, { useEffect, useState } from "react";
import { Folder, File } from "./Buttons";
import FileModal from "./FileModal";
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
    
    const {folderId,folder,childFolders}=useFolder(Id,null);
    console.log(folder);
    console.log(childFolders);
    const [fileModal,setFileModal]=useState(false);
    
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
                <button className=" hover:text-green-500 rounded"><Folder /></button>
                <button onClick={handleFileIconClick} className=" hover:text-blue-400 rounded"><File /></button>
            </div>
        </div>
    </div>
    
        {folder && childFolders && <div className="flex w-full flex-col md:flex-row mx-auto px-9 py-8">
            {childFolders.map((folder)=>(<Link className=" bg-gray-600 p-3 m-2 rounded-md md:m-8" key={folder.key} to={'/folder/'+(folder.key)} >{folder.name}</Link>))}

        </div>}
    
    </div>
     
        {fileModal && folder && <FileModal folderId={folderId} click={handleFileIconClick} folder={folder} />}
    
    </div>
    )
    
}
export default Front;