import React, { useState } from "react";
import { useAuth } from "../../context/AuthContest";
import { database, storage } from "../../firebase";
import { ref ,uploadBytes,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import { addDoc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import {createPortal} from "react-dom" 

const FileModal=(props)=>{
    console.log(props.folderId)
    const {curruser}=useAuth();
    const [file,setFile]=useState(null);
    const [progress,setProgress]=useState(0);
    const handleInputChange=(e)=>{
        setFile(e.target.files[0])
        console.log(e.target.files[0].type);
    }
    const createFile=()=>{
        props.click();
        let parentPath;
        if(props.folder.name!="root"){
            parentPath=props.folder.path.map((item)=>item.name).join('/');
            console.log(parentPath);
        }else{
            parentPath=file.name;
        }
        const filePath= props.folder.name==="root"?parentPath:parentPath+'/'+props.folder.name+'/'+file.name;
        const fileRef=ref(storage,"/files/"+filePath);
        const uploadTask=uploadBytesResumable(fileRef,file);
        uploadTask.on('state_changed',
            (snapshot)=>{
                const prog=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                setProgress(prog);
                console.log('Upload is ' + progress + '% done');
                console.log(snapshot);
                
            },
            (e)=>{console.log(e)},
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
                    console.log("uploaded")
                    const q=query(database.files,where("name","==",file.name),where("userId","==",curruser.uid),where("parID","==",props.folderId));
                    const dc= await getDocs(q);
                    if(!dc.empty){
                        dc.forEach(async(refer)=>{
                        const existingFile=refer.data();
                        console.log(existingFile)
                        if(existingFile){
                            console.log("exists")
                            console.log(refer.ref)
                            await updateDoc(refer.ref,{
                                url:downloadURL
                            })
                            console.log(existingFile);
                        }
                    })
                    }else{
                            console.log("new add")
                            const fileRef=await addDoc(database.files,{
                                url:downloadURL,
                                name:file.name,
                                parID:props.folderId,
                                createdAtTime:database.time,
                                userId:curruser.uid,
                                path:filePath,
                                type:file.type
                        })  
                        }
                        
                    
                        
                    })
                    
                
            }
        )
        setFile(null);
    }
    return(
        <div className=" flex fixed inset-0 justify-center items-center z-50">
            <div  className="flex bg-gray-100 w-full max-w-lg mx-4 p-10 md:mx-auto md:w-3/5 md:auto justify-center rounded-md">
                <div className="flex flex-col w-full space-y-8">
                    <div className=" space-y-3">
                        <label className=" text-sm font-medium"> File Name</label>
                        <input type="file"  onChange={handleInputChange} className=" rounded-md w-full p-3 ring-green-300 ring-2" placeholder="Write your File Name..."/>
                    </div>
                    <div className="flex justify-around">
                        <button type="submit" onClick={createFile} className=" rounded-sm text-white bg-blue-500 py-2.5 px-5 text-center">Add</button>
                        <button onClick={props.click} className=" rounded-sm text-white bg-blue-500 py-2.5 px-5 text-center">Close</button>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default FileModal