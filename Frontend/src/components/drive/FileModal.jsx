import React, { useState } from "react";
import { database } from "../../firebase.jsx";
import {  addDoc, collection } from "firebase/firestore"; 
import { useAuth } from "../../context/AuthContest.jsx";



const FileModal=(props)=>{

    const {curruser}=useAuth();
    const [fileName,setFileName]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    const createFolder= async ()=>{
        props.click();
        const doc=await addDoc(database.folders,{
            name:fileName,
            userId:curruser.uid,
            createAtTime:database.time,
            parID:props.folderId
        })
        setFileName("");
        
    }
    const handleInputChange = (e) => {
        setFileName(e.target.value);
      };
    return(
        <div className=" flex fixed inset-0 justify-center items-center backdrop-blur-sm z-50">
            <div  className="flex bg-gray-100 w-full max-w-lg mx-4 p-10 md:mx-auto md:w-3/5 md:auto justify-center rounded-md">
                <div className="flex flex-col w-full space-y-8">
                    <div className=" space-y-3">
                        <label className=" text-sm font-medium"> File Name</label>
                        <input type="text"  value={fileName} onChange={handleInputChange} className=" rounded-md w-full p-3 ring-blue-300 ring-2" placeholder="Write your File Name..."/>
                    </div>
                    <div className="flex justify-around">
                        <button type="submit" onClick={createFolder} className=" rounded-sm text-white bg-blue-500 py-2.5 px-5 text-center">Create</button>
                        <button onClick={props.click} className=" rounded-sm text-white bg-blue-500 py-2.5 px-5 text-center">Close</button>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default FileModal