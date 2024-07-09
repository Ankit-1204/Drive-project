import React, {  useState } from "react";
import { Folder, File } from "./Buttons";
import FolderModal from "./FolderModal.jsx";
import FileModal from "./FileModal.jsx";
import { deleteObject, ref } from "firebase/storage";
import { database } from "../../firebase.jsx";
import { storage } from "../../firebase.jsx";
import { useFolder } from "../Hooks/useFolder.jsx";
import { Link, useParams } from "react-router-dom";
import { FaFile } from "react-icons/fa";
import { IoFolderOpen } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import FolderPath from "./FolderPath.jsx";
import Preview from "./Preview.jsx";
import { Friend } from "./Friend.jsx";
import { deleteDoc, doc } from "firebase/firestore";
import { useFriends } from "../Hooks/useFriends.jsx";

const Front=()=>{
    let {Id}=useParams();
    if(Id===undefined){
        Id=null;
    }
    const {request,friend}=useFriends();
    console.log(request);
    const {folderId,folder,childFolders,childFiles}=useFolder(Id,null);
    console.log(folder);
    const [preview,setPreview]=useState(false);
    const [showFriend,setShowFriend]=useState(false);
    const [fileModal,setFileModal]=useState(false);
    const [folderModal,setFolderModal]=useState(false);
    const [selectedFile,setSelectedFile]=useState(null);

    const deleteFile= async(file)=>{
        try {
            const fileRef= ref(storage,'files'+file.path);
            const fileDoc=doc(database.files,file.key);
            await deleteDoc(fileDoc); 
            await deleteObject(fileRef);
            
        } catch (error) {
            console.log(error);
        }
        
    }

    const deleteFolder= async(folder)=>{
        try{
            const folderDoc=doc(database.folders,folder.key);
            await deleteDoc(folderDoc);
        }catch(e){
            console.log("error is" ,e);
        }
    }
    
    const openFile=(file)=>{
        setSelectedFile(file);
        setPreview(true);
        console.log(file);
    }

    const closeFile=()=>{
        setSelectedFile(null);
        setPreview(false);
    }
    const handleFriendIconClick=()=>{
        setShowFriend(true);
    }
    const handleFolderIconClick=()=>{
        setFolderModal(!folderModal);
    }
    const handleFileIconClick=()=>{
        setFileModal(!fileModal);
    }
    return(
        
    <div className="w-full h-full bg-gradient-to-b from-gray-900 to-gray-600">
     
    <div >
       <div className="w-full mx-auto px-9 py-1 bg-gray-300">
        <div className="flex flex-wrap justify-between items-center w-full">
            {folder ? <FolderPath folder={folder} /> :<span className="text-2xl font-bold font-mono">Loading</span>}
            <div className=" w-1/6 flex flex-row justify-between md:pr-8">
                <button onClick={handleFriendIconClick}>Friend</button>
                <button onClick={handleFileIconClick} className=" hover:text-green-500 rounded"><File /></button>
                <button onClick={handleFolderIconClick} className=" hover:text-blue-400 rounded"><Folder /></button>
            </div>
        </div>
    </div>
        {folder && childFolders && <div className="grid grid-cols-1 md:grid-cols-3 py-5 px-5 gap-y-6 ">
            {childFolders.map((folder)=>(<div className="flex flex-row items-center" key={folder.key}><Link key={folder.key} to={'/folder/'+(folder.key)} ><button className=" px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><IoFolderOpen className=" mr-3 w-5 h-5 md:w-9 md:h-9" /> {folder.name}</button></Link> <button onClick={()=>{deleteFolder(folder)}}><AiFillDelete className=" text-red-700 ml-2 w-5 h-5 hover:w-7 hover:h-7"/></button> </div>))}
            {childFiles.map((file)=>(<div className="flex flex-row items-center" key={file.key}><button onClick={()=>openFile(file)} className=" px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><FaFile className=" mr-3 w-5 h-5 md:w-9 md:h-9" /> {file.name}</button> <button onClick={()=>{deleteFile(file)}}><AiFillDelete className=" text-red-700 ml-2 w-5 h-5 hover:w-7 hover:h-7"/></button></div>))}
        </div>}
    
    </div>
     
        {folderModal && folder && <FolderModal folderId={folderId} click={handleFolderIconClick} folder={folder} />}
        {fileModal && folder && <FileModal folderId={folderId} click={handleFileIconClick} folder={folder} />}
        {selectedFile && <Preview closeFile={closeFile} file={selectedFile}/>}
        {showFriend && <Friend friend={friend} request={request}/>}
    </div>
    )
    
}
export default Front;