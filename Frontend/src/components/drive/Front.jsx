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
import { PiShareFatFill } from "react-icons/pi";
import FolderPath from "./FolderPath.jsx";
import Preview from "./Preview.jsx";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useFriends } from "../Hooks/useFriends.jsx";
import { useAuth } from "../../context/AuthContest.jsx";
const Front=()=>{

    let {Id}=useParams();
    const {curruser}=useAuth();
    if(Id===undefined){
        Id=null;
    }
    const {friend,request}=useFriends();
    console.log(request);
    const {folderId,folder,childFolders,childFiles,sharedFiles}=useFolder(Id,null);
    console.log(folder);
    console.log(sharedFiles);
    const [preview,setPreview]=useState(false);
    const [fileModal,setFileModal]=useState(false);
    const [folderModal,setFolderModal]=useState(false);
    const [selectedFile,setSelectedFile]=useState(null);
    const [sharingFile, setSharingFile] = useState(null);
    const [sharedFilesDropdown, setSharedFilesDropdown] = useState(false);
    const [showProg,setShowProg]=useState(false);
    const [progVal,setProgVal]=useState(0);

    const deleteFile= async(file)=>{
        try {
            const fileRef= ref(storage,'files/'+curruser.uid +file.path);
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
    const handleFolderIconClick=()=>{
        setFolderModal(!folderModal);
    }
    const handleFileIconClick=()=>{
        setFileModal(!fileModal);
    }
    const handleShareIconClick = (file) => {
        setSharingFile(file);
    };
    const handleShare = async (shareEmail) => {
        const friendDoc = friend.find(f => f.email === shareEmail);
        const friendId=friendDoc.id;
        if (friendDoc) {
            const fileDocRef = doc(database.files, sharingFile.key);
            const fileDoc = await getDoc(fileDocRef);
            if (fileDoc.exists()) {
                const sharedUsers = fileDoc.data().sharedUsers || [];
                if (!sharedUsers.some(user => user === friendId)) {
                    await updateDoc(fileDocRef, {
                        sharedUsers: [...sharedUsers, friendId]
                    });
                    console.log("File shared successfully!");
                } else {
                    console.log("User already has access to this file.");
                }
            }
        } else {
            console.log("Email not found in friend list.");
        }
        
        setSharingFile(null);
    };
    const toggleSharedFilesDropdown = () => {
        setSharedFilesDropdown(!sharedFilesDropdown);
      };
    return(   
    <div className="w-full h-full bg-gradient-to-b from-gray-300 to-gray-500">
     
    
       <div className="w-full mx-auto px-9 py-1 bg-gray-300">
        <div className="flex flex-wrap justify-between items-center w-full">
            {folder ? <FolderPath folder={folder} /> :<span className="text-2xl font-bold font-mono">Loading</span>}
            <div className=" w-1/6 flex flex-row justify-between md:pr-8">
                
                <button onClick={handleFileIconClick} className=" hover:text-green-500 rounded"><File /></button>
                <button onClick={handleFolderIconClick} className=" hover:text-blue-400 rounded"><Folder /></button>
            </div>
        </div>
    </div>
    
        {folder && childFolders && <div className="grid grid-cols-1 md:grid-cols-3 py-5 px-5 gap-y-6 ">
            {childFolders.map((folder)=>(<div className="flex flex-row items-center " key={folder.key}><Link key={folder.key} to={'/folder/'+(folder.key)} ><button className=" px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><IoFolderOpen className=" mr-3 w-5 h-5 md:w-9 md:h-9" /> {folder.name}</button></Link> <button onClick={()=>{deleteFolder(folder)}}><AiFillDelete className=" text-red-700 ml-2 w-5 h-5 hover:w-7 hover:h-7"/></button> </div>))}
            {childFiles.map((file)=>(<div className="flex flex-row items-center " key={file.key}><button onClick={()=>openFile(file)} className=" px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><FaFile className=" mr-3 w-5 h-5 md:w-9 md:h-9" /> {file.name}</button> <button onClick={()=>{deleteFile(file)}}><AiFillDelete className=" text-red-700 ml-2 w-5 h-5 hover:w-7 hover:h-7"/></button><button onClick={() => { handleShareIconClick(file) }}> <PiShareFatFill className=" text-blue-700 my-2 ml-2 w-5 h-5 hover:w-7 hover:h-7" /></button></div>))}

        </div>}
        {sharingFile && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg ">
                        <h3 className="text-lg font-medium">Share {sharingFile.name}</h3>
                        {console.log(friend)}
                        {friend.map((f)=><div className=" py-2 text-blue-500" key={f.id}><button onClick={()=>handleShare(f.email)}>{f.email}</button></div>)}
                        <div className="flex mt-4 justify-center">
                            <button onClick={() => setSharingFile(null)} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        <button onClick={toggleSharedFilesDropdown} className="fixed bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-full">
            Shared Files
        </button>
        {sharedFilesDropdown && (
        <div className="fixed bottom-16 right-4 bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-medium">Shared Files</h3>
          {sharedFiles.length > 0 ? (
            sharedFiles.map((file) => (
              <div key={file.key} className="flex flex-row items-center">
                <button onClick={() => openFile(file)} className="text-blue-600 hover:underline">
                  {file.name}
                </button>
              </div>
            ))
          ) : (
            <p>No shared files found.</p>
          )}
        </div>
      )}
        {folderModal && folder && <FolderModal folderId={folderId} click={handleFolderIconClick} folder={folder} />}
        {fileModal && folder && <FileModal folderId={folderId} click={handleFileIconClick} folder={folder} setProgVal={setProgVal} setShowProg={setShowProg}/>}
        {selectedFile && <Preview closeFile={closeFile} file={selectedFile}/>}
        {showProg && <div className="fixed bottom-4 left-2 rounded-lg bg-white p-4">
                <progress value={progVal} className=""/>
                    </div>}
    </div>
    )
    
}
export default Front;